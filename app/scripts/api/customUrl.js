import fs from "fs";
import request from "request";
import uuid from "uuid";
import axios from "axios";
import throttle from "lodash/function/throttle";
import Sound from "../classes/newSound";

const Supported = ["mp3", "opus", "ogg", "wav", "aac", "m4a", "mp4", "weba"];

function onData(progressed, sound, data) {
  let progress = (this.dataRead += data.length) / this.fileSize;
  if (this.fileSize && progress) progressed(sound, progress);
}

export function getCustomURL(name, url, source="customStream", icon="") {
  this.fileSize = 1;
  this.dataRead = 0;
  let progressBuffer = throttle(this.progressed, 100);
  return new Promise((resolve, reject) => {
    var ext = /^([\w\-]+)/.exec(url.split(".").pop())[0];
    if (Supported.indexOf(ext) === -1) {
      return reject(new Error(`${url} doesn't contain an audio format`));
    }
    let newSound = {...Sound, ...{
      file: source === "kakapoStream" ? url.replace(/^.*[\\\/]/, '') : `${uuid()}.${ext}`,
      img: icon,
      name: name,
      progress: 0,
      source: source,
      tags: ""
    }};
    request({ method: "GET", uri: url })
    .on("response", res => {
      if (!res.headers["content-length"]) {
        this.fileSize = 0;
        return reject(new Error(`Cannot download ${name}`));
      }
      this.fileSize = res.headers["content-length"];
    })
    .on("error", reject.bind(null, newSound))
    .on("data", onData.bind(this, progressBuffer, newSound))
    .on("end", resolve.bind(null, newSound))
    .pipe(fs.createWriteStream(`./app/sounds/${newSound.file}`));
  });
}

export function getKakapoFavourites() {
  return new Promise((resolve, reject) => {
    axios.get("http://data.kakapo.co/data/sounds.json")
      .then(res => resolve(res.data))
      .catch(res => reject(res.data.errors[0].error_message));
    });
}
