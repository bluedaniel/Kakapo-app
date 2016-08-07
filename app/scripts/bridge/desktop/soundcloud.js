import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { pathConfig, serialize } from 'utils/';
import { newSoundClass } from 'classes/';

const SCAPI = 'http://api.soundcloud.com';
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = '733c506264b8a0b6b05c85d9f1615567';

let fileSize = 0;
let dataRead = 0;
let newSound = {};

const actions = {
  getSoundCloudObj() {
    return null;
  },

  getSoundCloudSearch(q) {
    const params = { q, client_id: SOUNDCLOUD_KEY, filter: 'downloadable' };
    return new Promise((resolve, reject) =>
      fetch(`${SCAPI}/tracks${serialize(params)}`)
      .then(res => resolve(res.data))
      .catch(response => reject(response)));
  },

  getSoundCloudURL(subject, soundcloudID) {
    fileSize = 0;
    dataRead = 0;
    newSound = {};

    const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

    fetch(`${SCAPI_TRACKS}/${soundcloudID}${serialize({ client_id: SOUNDCLOUD_KEY })}`)
    .then(response => {
      if (!response.data.download_url) {
        subject.error('Sorry, that SoundCloud track cannot be downloaded.');
      }

      newSound = { ...newSoundClass,
        file: path.join(pathConfig.userSoundDir, `${shortid.generate()}.mp3`),
        source: 'soundcloudStream',
        name: response.data.title,
        tags: response.data.tag_list,
        img: response.data.artwork_url || 'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
        link: response.data.permalink_url
      };

      request(`${response.data.download_url}?client_id=${SOUNDCLOUD_KEY}`)
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
    })
    .catch(response => subject.error(response.data.errors[0].error_message));
  }
};

export default actions;
