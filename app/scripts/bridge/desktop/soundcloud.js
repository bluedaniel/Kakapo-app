import axios from 'axios';
import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import uuid from 'uuid';
import { pathConfig } from 'utils';
import { newSoundClass } from 'classes';
import { EventEmitter } from 'events';

const SCAPI = 'http://api.soundcloud.com';
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = '733c506264b8a0b6b05c85d9f1615567';

let fileSize = 0;
let currentProgress = 0;
let dataRead = 0;
let newSound = {};

function downloadProgress(ee, data) {
  if (!newSound) return;
  const progress = (dataRead += data.length) / fileSize;
  if (progress > (currentProgress + 0.05) || progress === 1) {
    currentProgress = progress;
    ee.emit('progress', { ...newSound, ...{
      progress: progress
    } });
  }
}

const actions = {
  getSoundCloudObj() {
    return null;
  },

  getSoundCloudSearch(_q) {
    return new Promise((resolve, reject) => {
      axios.get(`${SCAPI}/tracks`, { params: {
        q: _q,
        client_id: SOUNDCLOUD_KEY,
        filter: 'downloadable'
      } })
      .then(res => resolve(res.data))
      .catch(response => reject(response));
    });
  },

  getSoundCloudURL(soundcloudID) {
    fileSize = 0;
    currentProgress = 0;
    dataRead = 0;
    newSound = {};

    const ee = new EventEmitter();

    const tmpFile = path.join(pathConfig.userSoundDir, uuid());

    axios
    .get(`${SCAPI_TRACKS}/${soundcloudID}`, { params: { client_id: SOUNDCLOUD_KEY } })
    .then(response => {
      if (!response.data.download_url) {
        ee.emit('error', 'Sorry, that SoundCloud track cannot be downloaded.');
        return ee;
      }

      newSound = { ...newSoundClass, ...{
        file: path.join(pathConfig.userSoundDir, `${uuid()}.mp3`),
        source: 'soundcloudStream',
        name: response.data.title,
        tags: response.data.tag_list,
        img: response.data.artwork_url || 'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
        link: response.data.permalink_url
      } };

      request(`${response.data.download_url}?client_id=${SOUNDCLOUD_KEY}`)
      .on('response', res => {
        fileSize = res.headers['content-length'];
        if (!fileSize) {
          ee.emit('error', 'Error: Could not access file.');
        } else {
          res.on('data', downloadProgress.bind(this, ee))
          .on('error', e => ee.emit('error', 'Error: ' + e.message))
          .on('end', () => {
            fs.rename(tmpFile, newSound.file);
            ee.emit('finish', newSound); // Completed download
          });
        }
      })
      .pipe(fs.createWriteStream(tmpFile));
    })
    .catch(response => ee.emit('error', response.data.errors[0].error_message));

    return ee;
  }
};

export default actions;
