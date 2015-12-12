import ytdl from 'ytdl-core';
import fs from 'fs-extra';
import path from 'path';
import uuid from 'uuid';
import { pathConfig } from '../../utils';
import throttle from 'lodash/function/throttle';
import { newSoundClass } from '../../classes';

let fileSize = 1;
let dataRead = 0;

const actions = {
  getYoutubeObj() {
    return null;
  },

  onData(progressed, sound, data) {
    const progress = (dataRead += data.length) / fileSize;
    progressed(sound, progress);
  },

  getYoutubeURL(data) {
    fileSize = 1;
    dataRead = 0;
    const progressBuffer = throttle(this.progressed, 100);
    return new Promise((resolve, reject) => {
      ytdl.getInfo(`https://www.youtube.com/watch?v=${data.videoID}`, { downloadURL: true }, (err, info) => {
        if (err) reject(err);

        const audioFormats = info.formats.filter(format => (format.container && format.type) && format.type.startsWith('audio'));
        if (!audioFormats.length) reject(new Error(`https://youtu.be/${data.videoID} doesn"t contain an audio format`));

        const audioFormat = audioFormats.reduce((acc, audio) => audio.audioBitrate > acc.audioBitrate ? audio : acc, { audioBitrate: 0 });
        const newSound = { ...newSoundClass, ...{
          file: path.join(pathConfig.userSoundDir, `${uuid()}.${audioFormat.container}`),
          img: info.thumbnail_url,
          link: `https://www.youtube.com/watch?v=${info.video_id}`,
          name: info.title,
          progress: 0,
          source: 'youtubeStream',
          tags: info.keywords ? info.keywords.join(' ') : ''
        } };

        ytdl.downloadFromInfo(info, {
          format: audioFormat
        })
        .on('error', reject.bind(null, newSound))
        .on('format', formatInfo => fileSize = formatInfo.size)
        .on('data', this.onData.bind(this, progressBuffer, newSound))
        .on('end', resolve.bind(null, newSound))
        .pipe(fs.createWriteStream(newSound.file));
      });
    });
  }
};

export default actions;
