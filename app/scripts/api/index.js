import axios from 'axios';
import fs from 'fs-extra';
import { bridgedYoutube } from '../bridge';
import getHowlerObj from './howler';
import { getCustomURL, getKakapoFavourites } from './customUrl';
import { getSoundCloudSearch, getSoundCloudURL, getSoundCloudObj } from './soundcloud';
import { getYoutubeSearch } from './youtube';
import { pathConfig } from '../utils';

const { getYoutubeObj, getYoutubeURL } = bridgedYoutube;

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
