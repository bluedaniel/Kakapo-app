import Reflux from "reflux";
import { getYoutubeSearch, getSoundCloudSearch, getKakapoFavourites } from "../api";

let searchActions = Reflux.createActions({
  "getKakapoFavourites": { asyncResult: true },
  "getYoutubeSearch": { asyncResult: true },
  "getSoundCloudSearch": { asyncResult: true }
});

searchActions.getKakapoFavourites.listenAndPromise(getKakapoFavourites);
searchActions.getYoutubeSearch.listenAndPromise(getYoutubeSearch);
searchActions.getSoundCloudSearch.listenAndPromise(getSoundCloudSearch);

export default searchActions;
