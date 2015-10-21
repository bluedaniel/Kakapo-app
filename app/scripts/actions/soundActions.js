import Reflux from "reflux";
import { getYoutubeURL, getCustomURL, getSoundCloudURL } from "../api";

const soundActions = Reflux.createActions([
  {getYoutubeURL: { children: ["completed", "failed", "progressed"] }},
  {getCustomURL: { children: ["completed", "failed", "progressed"] }},
  {getSoundCloudURL: { children: ["completed", "failed", "progressed"] }},
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
