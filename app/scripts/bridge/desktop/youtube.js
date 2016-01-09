import ytdl from 'ytdl-core';
import fs from 'fs-extra';
import path from 'path';
import uuid from 'uuid';
import { pathConfig } from '../../utils';
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
  getYoutubeObj() {
    return null;
  },

  getYoutubeURL(data) {
    fileSize = 0;
    currentProgress = 0;
    dataRead = 0;
    newSound = {};

    const ee = new EventEmitter();

    const tmpFile = path.join(pathConfig.userSoundDir, uuid());

    ytdl(`https://www.youtube.com/watch?v=${data.file}`, {
      format: 'audioonly',
      debug: true
    })
    .on('info', (info, format) => {
      newSound = { ...newSoundClass, ...{
        file: path.join(pathConfig.userSoundDir, `${uuid()}.${format.container}`),
        img: info.thumbnail_url,
        link: `https://www.youtube.com/watch?v=${info.video_id}`,
        name: info.title,
        source: 'youtubeStream',
        tags: info.keywords ? info.keywords.join(' ') : ''
      } };
      fileSize = format.size;
    })
    .on('error', e => ee.emit('error', 'problem with request: ' + e.message))
    .on('data', downloadProgress.bind(this, ee))
    .on('finish', () => {
      fs.rename(tmpFile, newSound.file);
      ee.emit('finish', newSound); // Completed download
    })
    .pipe(fs.createWriteStream(tmpFile));

    return ee;
  }
};

export default actions;
