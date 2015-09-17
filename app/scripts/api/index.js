import getHowlerObj from "./howler";
import { getCustomURL, getKakapoFavourites } from "./customUrl";
import { getYoutubeObj, getYoutubeSearch, getYoutubeURL } from "./youtube";
import { getSoundCloudSearch, getSoundCloudURL, getSoundCloudObj } from "./soundcloud";

function createSoundObj(s) {
  return new Promise(resolve => {
    switch (s.source) {
      case "soundcloudStream":
        resolve(getSoundCloudObj(s));
        break;
      case "youtubeStream":
        resolve(getYoutubeObj(s));
        break;
      default:
        resolve(getHowlerObj(s));
    }
  });
}

export default {
  getCustomURL,
  getKakapoFavourites,
  getSoundCloudSearch,
  getSoundCloudURL,
  getYoutubeSearch,
  getYoutubeURL,
  createSoundObj
};
