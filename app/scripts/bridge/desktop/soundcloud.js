import { eventChannel, END } from 'redux-saga';
import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { equals, not, pipe } from 'ramda';
import { pathConfig, serialize, newSoundObj, noop } from 'utils/';

const SCAPI = 'http://api.soundcloud.com';
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = '733c506264b8a0b6b05c85d9f1615567';

export default {
  getSoundCloudObj: noop,

  getSoundCloudSearch(q) {
    const params = { q, client_id: SOUNDCLOUD_KEY, filter: 'downloadable' };
    return fetch(`${SCAPI}/tracks${serialize(params)}`).then(res => res.json());
  },

  getSoundCloudURL(soundcloudID) {
    return eventChannel(emit => {
      let progress = 0;
      let fileSize = 0;
      let dataRead = 0;
      let newSound = {};

      const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

      fetch(
        `${SCAPI_TRACKS}/${soundcloudID}${serialize({
          client_id: SOUNDCLOUD_KEY,
        })}`
      )
        .then(res => res.json())
        .then(res => {
          if (!res.downloadable) {
            emit(
              new Error('Sorry, that SoundCloud track cannot be downloaded.')
            );
          }

          newSound = {
            ...newSoundObj,
            file: path.join(
              pathConfig.userSoundDir,
              `${shortid.generate()}.mp3`
            ),
            source: 'soundcloudStream',
            name: res.title,
            tags: res.tag_list,
            img:
              res.artwork_url ||
              'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
            link: res.permalink_url,
          };

          request(`${res.download_url}?client_id=${SOUNDCLOUD_KEY}`)
            .on('response', resp => {
              fileSize = resp.headers['content-length'];
              if (!fileSize) {
                emit(new Error('Error: Could not access file.'));
              } else {
                resp
                  .on('data', data => {
                    const newProgress = (
                      (dataRead += data.length) / fileSize
                    ).toFixed(2);
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
                    emit({ ...newSound, progress: 1 });
                    emit(END); // Completed download
                  });
              }
            })
            .pipe(fs.createWriteStream(tmpFile));
        })
        .catch(res => emit(new Error(res)));

      return noop;
    });
  },
};
