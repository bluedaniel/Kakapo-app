/* eslint camelcase:0 */
import ytdl from 'ytdl-core';
import fs from 'fs-extra';
import path from 'path';
import shortid from 'shortid';
import { pathConfig } from 'utils/';
import { newSoundClass } from 'classes/';

let fileSize = 0;
let dataRead = 0;
let newSound = {};

const actions = {
  getYoutubeObj() {
    return null;
  },

  getYoutubeURL(subject, data) {
    fileSize = 0;
    dataRead = 0;
    newSound = {};

    const tmpFile = path.join(pathConfig.userSoundDir, shortid.generate());

    ytdl(`https://www.youtube.com/watch?v=${data.file}`, {
      format: 'audioonly',
      debug: true
    })
      .on('response', ({ headers }) => {
        fileSize = headers['content-length'];
      })
      .on(
        'info',
        ({ title, keywords, thumbnail_url, video_id }, { container }) => {
          newSound = {
            ...newSoundClass,
            file: path.join(
              pathConfig.userSoundDir,
              `${shortid.generate()}.${container}`
            ),
            img: thumbnail_url,
            link: `https://www.youtube.com/watch?v=${video_id}`,
            name: title,
            source: 'youtubeStream',
            tags: keywords ? keywords.join(' ') : ''
          };
        }
      )
      .on('error', e => subject.error(`Error: ${e.message}`))
      .on('data', data => {
        const progress = (dataRead += data.length) / fileSize;
        subject.next({ ...newSound, progress });
      })
      .on('finish', () => {
        fs.rename(tmpFile, newSound.file);
        subject.next(newSound);
        subject.complete(); // Completed download
      })
      .pipe(fs.createWriteStream(tmpFile));
  }
};

export default actions;
