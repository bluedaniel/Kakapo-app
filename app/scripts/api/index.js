import getHowlerObj from "./howler";
import { getCustomURL, getKakapoFavourites } from "./customUrl";
import { getYoutubeSearch, getYoutubeURL } from "./youtube";
import { getSoundCloudSearch, getSoundCloudURL } from "./soundcloud";

function createSoundObj(s) {
  return new Promise(resolve => resolve(getHowlerObj(s)));
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
