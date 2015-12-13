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

function downloadProgress(sound, ee, data) {
  const progress = (dataRead += data.length) / fileSize;
  if (progress > (currentProgress + 0.05) || progress === 1) {
    currentProgress = progress;
    ee.emit('progress', { ...sound, ...{
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

    const ee = new EventEmitter();

    let newSound = {};
    const tmpFile = path.join(pathConfig.userSoundDir, uuid());

    ytdl(`https://www.youtube.com/watch?v=${data.id}`, {
      format: 'audioonly'
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
    })
    .on('error', e => ee.emit('error', 'problem with request: ' + e.message))
    .on('response', resp => {
      fileSize = resp.headers['content-length'];
      resp.on('data', downloadProgress.bind(this, newSound, ee));
    })
    .on('finish', () => {
      fs.rename(tmpFile, newSound.file);
      ee.emit('finish', newSound); // Completed download
    })
    .pipe(fs.createWriteStream(tmpFile));

    return ee;
  }
};

export default actions;
