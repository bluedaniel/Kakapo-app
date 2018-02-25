import fs from 'fs-extra';
import { bridgedYoutube, bridgedSoundcloud, bridgedCustom } from 'kakapoBridge';
import { pathConfig } from 'utils/';
import getHowlerObj from './howler';
import getKakapoFavourites from './customUrl';
import { getYoutubeSearch } from './youtube';

const { getCustomFile, getCustomURL } = bridgedCustom;
const { getYoutubeObj, getYoutubeURL } = bridgedYoutube;
const {
  getSoundCloudSearch,
  getSoundCloudURL,
  getSoundCloudObj,
} = bridgedSoundcloud;

export const getDefaultSounds = () => {
  /* istanbul ignore if */
  if (__DESKTOP__) {
    return new Promise((resolve, reject) =>
      fs.readJson(pathConfig.soundFile, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    );
  }

  const defaultSounds = fetch('http://data.kakapo.co/v2/data/sounds.json').then(
    resp => resp.json()
  );

  return new Promise(resolve =>
    new Promise(res => {
      window.onYouTubeIframeAPIReady = res(true);
    }).then(resolve(defaultSounds))
  );
};

export const createSoundObj = sound =>
  new Promise(resolve => {
    /* istanbul ignore if */
    if (__DESKTOP__) return resolve(getHowlerObj(sound));
    switch (sound.source) {
      case 'soundcloudStream':
        return resolve(getSoundCloudObj(sound));
      case 'youtubeStream':
        return resolve(getYoutubeObj(sound));
      default:
        return resolve(getHowlerObj(sound));
    }
  });

export {
  getCustomFile,
  getCustomURL,
  getKakapoFavourites,
  getSoundCloudSearch,
  getSoundCloudURL,
  getYoutubeObj,
  getYoutubeSearch,
  getYoutubeURL,
};
