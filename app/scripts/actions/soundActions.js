import Reflux from "reflux";
import { getYoutubeURL, getCustomURL, getSoundCloudURL } from "../api";

const soundActions = Reflux.createActions([
  {getYoutubeURL: { asyncResult: true }},
  {getCustomURL: { asyncResult: true }},
  {getSoundCloudURL: { asyncResult: true }},
  "toggleMute",
  "togglePlayPause",
  "changeVolume",
  "removeSound",
  "editSound"
]);

soundActions.getSoundCloudURL.listenAndPromise(getSoundCloudURL);
soundActions.getYoutubeURL.listenAndPromise(getYoutubeURL);
soundActions.getCustomURL.listenAndPromise(getCustomURL);

export default soundActions;
