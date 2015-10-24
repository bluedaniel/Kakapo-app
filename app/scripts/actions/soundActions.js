import Reflux from "reflux";
import { getYoutubeURL, getCustomURL, getSoundCloudURL, getCustomFile } from "../api";

const soundActions = Reflux.createActions([
  {getYoutubeURL: { children: ["completed", "failed", "progressed"] }},
  {getCustomURL: { children: ["completed", "failed", "progressed"] }},
  {getCustomFile: { children: ["completed", "failed"] }},
  {getSoundCloudURL: { children: ["completed", "failed", "progressed"] }},
  "toggleMute",
  "togglePlayPause",
  "changeVolume",
  "removeSound",
  "editSound"
]);

soundActions.getCustomFile.listenAndPromise(getCustomFile);
soundActions.getSoundCloudURL.listenAndPromise(getSoundCloudURL);
soundActions.getYoutubeURL.listenAndPromise(getYoutubeURL);
soundActions.getCustomURL.listenAndPromise(getCustomURL);

export default soundActions;
