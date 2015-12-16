import axios from 'axios';
import fs from 'fs-extra';
import { bridgedYoutube, bridgedSoundcloud, bridgedCustom } from 'kakapoBridge';
import getHowlerObj from './howler';
import { getKakapoFavourites } from './customUrl';
import { getYoutubeSearch } from './youtube';
import { pathConfig } from '../utils';

const { getCustomURL } = bridgedCustom;
const { getYoutubeObj, getYoutubeURL } = bridgedYoutube;
const { getSoundCloudSearch, getSoundCloudURL, getSoundCloudObj } = bridgedSoundcloud;

export function getDefaultSounds() {
  if (__DESKTOP__) {
    return new Promise((resolve, reject) => fs.readJson(pathConfig.soundFile, (err, data) => {
      if (err) reject(err);
      resolve(data);
    }));
  }
  return axios.get('http://data.kakapo.co/v2/data/sounds.json');
}

export function createSoundObj(sound) {
  return new Promise(resolve => {
    if (__DESKTOP__) return resolve(getHowlerObj(sound));
    switch (sound.source) {
      case 'soundcloudStream':
        resolve(getSoundCloudObj(sound));
        break;
      case 'youtubeStream':
        resolve(getYoutubeObj(sound));
        break;
      default:
        resolve(getHowlerObj(sound));
    }
  });
}

export {
  getCustomURL,
  getKakapoFavourites,
  getSoundCloudSearch,
  getSoundCloudURL,
  getYoutubeObj,
  getYoutubeSearch,
  getYoutubeURL
};
