import getHowlerObj from "./howler";
import { getCustomURL, getKakapoFavourites } from "./customUrl";
import { getYoutubeSearch, getYoutubeURL } from "./youtube";
import { getSoundCloudSearch, getSoundCloudURL } from "./soundcloud";

function createSoundObj(_s) {
  return new Promise(resolve => resolve(getHowlerObj(_s)));
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
