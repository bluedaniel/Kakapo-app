import axios from "axios";
import Sound from "../classes/newSound";

const Supported = ["mp3", "opus", "ogg", "wav", "aac", "m4a", "mp4", "weba"];

export function getCustomURL(name, url, source="customStream", icon="") {
  return new Promise((resolve, reject) => {
    var ext = /^([\w\-]+)/.exec(url.split(".").pop())[0];
    if (Supported.indexOf(ext) === -1) {
      return reject(new Error(`${url} must be one of ${Supported.join(", ")}`));
    }
    resolve({...Sound, ...{
      file: url,
      img: icon,
      name: name,
      progress: 0,
      source: source,
      tags: ""
    }});
  });
}

export function getKakapoFavourites() {
  return new Promise((resolve, reject) => {
    axios.get("http://data.kakapo.co/data/sounds.json")
      .then(res => resolve(res.data))
      .catch(res => reject(res.data.errors[0].error_message));
    });
}
