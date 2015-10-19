import axios from "axios";
import fs from "fs";
import request from "request";
import uuid from "uuid";
import throttle from "lodash/function/throttle";
import Sound from "../classes/newSound";

const SCAPI = "http://api.soundcloud.com";
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = "733c506264b8a0b6b05c85d9f1615567";

export function getSoundCloudSearch(_q) {
  return new Promise((resolve, reject) => {
    axios.get(`${SCAPI}/tracks`, { params: {
      q: _q,
      client_id: SOUNDCLOUD_KEY,
      filter: "public"
    }})
    .then(res => resolve(res.data.filter(_s => _s.download_url)))
    .catch(response => reject(response));
  });
}

function onData(progressed, sound, data) {
  const progress = (this.dataRead += data.length) / this.fileSize;
  progressed(sound, progress);
}

export function getSoundCloudURL(id) {
  this.fileSize = 1;
  this.dataRead = 0;
  const progressBuffer = throttle(this.progressed, 100);
  return new Promise((resolve, reject) => {
    axios.get(`${SCAPI_TRACKS}/${id}`, { params: { client_id: SOUNDCLOUD_KEY } })
      .then(response => {
        if (!response.data.download_url) {
          return reject(new Error(`Sorry, that SoundCloud track cannot be downloaded.`));
        }

        const newSound = {...Sound, ...{
          file: `${uuid()}.mp3`,
          source: "soundcloudStream",
          name: response.data.title,
          tags: response.data.tag_list,
          img: response.data.artwork_url || "https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png",
          link: response.data.permalink_url,
          progress: 0
        }};
        request({
          method: "GET",
          uri: `${response.data.download_url}?client_id=${SOUNDCLOUD_KEY}`
        })
        .on("response", res => this.fileSize = res.headers["content-length"])
        .on("error", reject.bind(null, newSound))
        .on("data", onData.bind(this, progressBuffer, newSound))
        .on("end", resolve.bind(null, newSound))
        .pipe(fs.createWriteStream(`./app/sounds/${newSound.file}`));
      })
      .catch(response => reject(response.data.errors[0].error_message));
  });
}
