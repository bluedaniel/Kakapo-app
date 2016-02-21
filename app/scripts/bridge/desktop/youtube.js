/* eslint camelcase:0 */
import ytdl from 'ytdl-core';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { pathConfig } from 'utils/';
import { newSoundClass } from 'classes/';
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
    ee.emit('progress', { ...newSound, progress });
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

    const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

    ytdl(`https://www.youtube.com/watch?v=${data.file}`, {
      format: 'audioonly',
      debug: true
    })
    .on('response', ({ headers }) => {
      fileSize = headers['content-length'];
    })
    .on('info', ({ title, keywords, thumbnail_url, video_id }, { container }) => {
      newSound = { ...newSoundClass, ...{
        file: path.join(pathConfig.userSoundDir, `${shortid.generate()}.${container}`),
        img: thumbnail_url,
        link: `https://www.youtube.com/watch?v=${video_id}`,
        name: title,
        source: 'youtubeStream',
        tags: keywords ? keywords.join(' ') : ''
      } };
    })
    .on('error', e => ee.emit('error', `Error: ${e.message}`))
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
