import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { pathConfig, validHowl, newSoundObj } from 'utils/';

let fileSize = 0;
let dataRead = 0;
let newSound = {};

const actions = {
  getCustomFile(name, filePath) {
    const file = `${shortid.generate()}.${path.extname(filePath).substring(1)}`;
    newSound = {
      ...newSoundObj,
      file: path.join(pathConfig.userSoundDir, file),
      img: '',
      name,
      source: 'customFile'
    };

    fs.copySync(filePath, newSound.file);
    return newSound;
  },

  getCustomURL(subject, data) {
    fileSize = 0;
    dataRead = 0;
    newSound = {};

    if (data.source === 'file') {
      subject.next(data);
      subject.complete();
      return;
    }

    const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

    if (!validHowl(data.file)) {
      subject.error(validHowl(data.file, true));
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
          subject.error('Error: Could not access file.');
        } else {
          res
            .on('data', data => {
              const progress = (dataRead += data.length) / fileSize;
              subject.next({ ...newSound, progress });
            })
            .on('error', e => subject.error(`Error: ${e.message}`))
            .on('end', () => {
              fs.rename(tmpFile, newSound.file);
              subject.next(newSound);
              subject.complete(); // Completed download
            });
        }
      })
      .pipe(fs.createWriteStream(tmpFile));
  }
};

export default actions;
