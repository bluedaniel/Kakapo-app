import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import uuid from 'uuid';
import { pathConfig } from '../../utils';
import { newSoundClass } from '../../classes';
import { EventEmitter } from 'events';

const Supported = [ 'mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba' ];

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

    const ext = /^([\w\-]+)/.exec(data.url.split('.').pop())[0];
    if (data.source !== 'file' && Supported.indexOf(ext) === -1) {
      ee.emit('error', `${data.url} must be one of ${Supported.join(', ')}`);
      return ee;
    }

    newSound = { ...newSoundClass, ... {
      file: data.url,
      img: data.icon,
      name: data.name,
      progress: 0,
      source: data.source,
      tags: ''
    } };

    request({
      method: 'GET',
      uri: data.url
    })
    .on('response', res => {
      fileSize = res.headers['content-length'];
    })
    .on('error', e => ee.emit('error', 'problem with request: ' + e.message))
    .on('data', downloadProgress.bind(this, ee))
    .on('end', () => {
      fs.rename(tmpFile, newSound.file);
      ee.emit('finish', newSound); // Completed download
    })
    .pipe(fs.createWriteStream(tmpFile));

    return ee;
  }
};

export default actions;
