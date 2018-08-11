import { eventChannel, END } from 'redux-saga';
import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { equals, not, pipe } from 'ramda';
import { pathConfig, validHowl, newSoundObj, noop, getProgress } from 'utils/';

export default {
  getCustomFile(name, filePath) {
    const file = `${shortid.generate()}.${path.extname(filePath).substring(1)}`;
    const newSound = {
      ...newSoundObj,
      file: path.join(pathConfig.userSoundDir, file),
      img: '',
      name,
      source: 'customFile',
    };

    fs.copySync(filePath, newSound.file);
    return newSound;
  },

  getCustomURL: data =>
    data.source === 'file'
      ? data
      : eventChannel(emit => {
          let progress = 0;
          let fileSize = 0;
          let dataRead = 0;
          let newSound = {};

          const tmpFile = path.join(
            pathConfig.userSoundDir,
            shortid.generate()
          );

          if (!validHowl(data.file)) {
            emit(new Error(validHowl(data.file, true)));
          }

          const file = `${shortid.generate()}.${path
            .extname(data.file)
            .substring(1)}`;
          newSound = {
            ...newSoundObj,
            ...data,
            file: path.join(pathConfig.userSoundDir, file),
          };

          request(data.file)
            .on('response', res => {
              fileSize = res.headers['content-length'];
              if (!fileSize) {
                emit(new Error('Error: Could not access file.'));
              } else {
                res
                  .on('data', stream => {
                    const newProgress = getProgress(
                      (dataRead += stream.length),
                      fileSize
                    );
                    if (
                      pipe(
                        equals(progress),
                        not
                      )(newProgress)
                    ) {
                      progress = newProgress;
                      emit({ ...newSound, progress });
                    }
                  })
                  .on('error', e => emit(new Error(`Error: ${e.message}`)))
                  .on('end', () => {
                    fs.rename(tmpFile, newSound.file);
                    emit(newSound);
                    emit(END); // Completed download
                  });
              }
            })
            .pipe(fs.createWriteStream(tmpFile));

          return noop;
        }),
};
