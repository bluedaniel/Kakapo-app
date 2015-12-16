import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import uuid from 'uuid';
import { pathConfig, validHowl } from '../../utils';
import { newSoundClass } from '../../classes';
import { EventEmitter } from 'events';

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
  getCustomURL(data) {
    fileSize = 0;
    currentProgress = 0;
    dataRead = 0;
    newSound = {};

    const ee = new EventEmitter();

    const tmpFile = path.join(pathConfig.userSoundDir, uuid());

    if (data.source !== 'file' && !validHowl(data.url)) {
      ee.emit('error', validHowl(data.url, true));
      return ee;
    }

    newSound = { ...newSoundClass, ... {
      file: path.join(pathConfig.userSoundDir, `${uuid()}.${path.extname(data.url).substring(1)}`),
      img: data.icon,
      name: data.name,
      source: data.source
    } };

    request(data.url)
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

    return ee;
  }
};

export default actions;
