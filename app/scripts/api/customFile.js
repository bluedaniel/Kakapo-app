import fs from "fs-extra";
import path from "path";
import uuid from "uuid";
import Sound from "../classes/newSound";
import { pathConfig } from "../utils";

const Supported = ["mp3", "opus", "ogg", "wav", "aac", "m4a", "mp4", "weba"];

export function getCustomFile(name, url, source = "customFile", icon = "") {
  return new Promise((resolve, reject) => {
    const ext = /^([\w\-]+)/.exec(url.split(".").pop())[0];
    if (Supported.indexOf(ext) === -1) {
      reject(new Error(`${url} doesn't contain an audio format`));
    }

    const newSound = {...Sound, ...{
      file: path.join(pathConfig.userSoundDir, `${uuid()}.${ext}`),
      img: icon,
      name: name,
      progress: 1,
      source: source,
      tags: ""
    }};

    fs.copy(url, newSound.file, err => {
      if (err) reject(new Error(`${url} doesn't contain an audio format`));
      resolve(newSound);
    });
  });
}
