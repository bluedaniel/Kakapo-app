import { eventChannel, END } from 'redux-saga';
import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { pathConfig, validHowl, newSoundObj, noop } from 'utils/';

export default {
  getCustomFile(name, filePath) {
    const file = `${shortid.generate()}.${path.extname(filePath).substring(1)}`;
    const newSound = {
      ...newSoundObj,
      file: path.join(pathConfig.userSoundDir, file),
      img: '',
      name,
      source: 'customFile'
    };

    fs.copySync(filePath, newSound.file);
    return newSound;
  },

  getCustomURL: data =>
    eventChannel(emitter => {
      let fileSize = 0;
      let dataRead = 0;
      let newSound = {};

      if (data.source === 'file') {
        emitter(data);
        emitter(END);
        return noop;
      }

      const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

      if (!validHowl(data.file)) {
        throw new Error(validHowl(data.file, true));
      }

      const file = `${shortid.generate()}.${path
        .extname(data.file)
        .substring(1)}`;
      newSound = {
        ...newSoundObj,
        ...data,
        file: path.join(pathConfig.userSoundDir, file)
      };

      request(data.file)
        .on('response', res => {
          fileSize = res.headers['content-length'];
          if (!fileSize) {
            throw new Error('Error: Could not access file.');
          } else {
            res
              .on('data', data => {
                const progress = (dataRead += data.length) / fileSize;
                emitter({ ...newSound, progress });
              })
              .on('error', e => {
                throw new Error(`Error: ${e.message}`);
              })
              .on('end', () => {
                fs.rename(tmpFile, newSound.file);
                emitter(newSound);
                emitter(END); // Completed download
              });
          }
        })
        .pipe(fs.createWriteStream(tmpFile));

      return noop;
    })
};
