import Reflux from "reflux";
import { getYoutubeURL, getCustomURL, getSoundCloudURL } from "../api";

let soundActions = Reflux.createActions({
  "getYoutubeURL": { asyncResult: true },
  "getCustomURL": { asyncResult: true },
  "getSoundCloudURL": { asyncResult: true },
  "toggleMute": { sync: true },
  "togglePlayPause": { sync: true },
  "changeVolume": { sync: true },
  "removeSound": { sync: true },
  "editSound": { sync: true }
});

soundActions.getSoundCloudURL.listenAndPromise(getSoundCloudURL);
soundActions.getYoutubeURL.listenAndPromise(getYoutubeURL);
soundActions.getCustomURL.listenAndPromise(getCustomURL);

export default soundActions;
