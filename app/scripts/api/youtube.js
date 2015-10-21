import axios from "axios";
import fs from "fs-extra";
import uuid from "uuid";
import ytdl from "ytdl-core";
import throttle from "lodash/function/throttle";
import Sound from "../classes/newSound";

const GAPI_URL = "https://www.googleapis.com/youtube/v3";
const GAPI_KEY = "AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI";
const GAPI_OPTS_SEARCH = {
  key: GAPI_KEY,
  maxResults: 15,
  part: "snippet",
  type: "video"
};
const GAPI_OPTS_LIST = {
  key: GAPI_KEY,
  part: "contentDetails,statistics,status"
};

function getStatistics(resolve, reject, videos) {
  // Get the duration
  let _it = 0;
  const paramObjV = {...GAPI_OPTS_LIST, ...{id: videos.map(_i => _i.id.videoId).join(",")}};
  axios.get(`${GAPI_URL}/videos`, { params: paramObjV })
    .then(response => resolve(response.data.items.map(_v =>
      ({...videos[_it++], ...{
        duration: _v.contentDetails.duration,
        viewCount: _v.statistics.viewCount}}))))
    .catch(response => reject(response));
}

function onData(progressed, sound, data) {
  const progress = (this.dataRead += data.length) / this.fileSize;
  progressed(sound, progress);
}

export function getYoutubeURL(url) {
  this.fileSize = 1;
  this.dataRead = 0;
  const progressBuffer = throttle(this.progressed, 100);
  return new Promise((resolve, reject) => {
    ytdl.getInfo(url, {downloadURL: true}, (err, info) => {
      if (err) {
        return reject(err);
      }

      const audioFormats = info.formats.filter(format => format.container && format.type.startsWith("audio"));
      if (!audioFormats.length) {
        return reject(new Error(`${url} doesn"t contain an audio format`));
      }

      const audioFormat = audioFormats.reduce((acc, audio) => audio.audioBitrate > acc.audioBitrate ? audio : acc, { audioBitrate: 0 });
      const newSound = {...Sound, ...{
        file: `${uuid()}.${audioFormat.container}`,
        img: info.thumbnail_url,
        link: `https://www.youtube.com/watch?v=${info.video_id}`,
        name: info.title,
        progress: 0,
        source: "youtubeStream",
        tags: info.keywords ? info.keywords.join(" ") : ""
      }};
      ytdl.downloadFromInfo(info, {
        format: audioFormat
      })
      .on("error", reject.bind(null, newSound))
      .on("format", formatInfo => this.fileSize = formatInfo.size)
      .on("data", onData.bind(this, progressBuffer, newSound))
      .on("end", resolve.bind(null, newSound))
      .pipe(fs.createWriteStream(`./app/sounds/${newSound.file}`));
    });
  });
}

export function getYoutubeSearch(_q) {
  return new Promise((resolve, reject) => {
    const paramObj = {...GAPI_OPTS_SEARCH, ...{q: _q}};
    axios.get(`${GAPI_URL}/search`, { params: paramObj })
      .then(response => getStatistics(resolve, reject, response.data.items))
      .catch(response => reject(response));
  });
}
