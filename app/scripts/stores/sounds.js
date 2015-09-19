import ipc from "ipc";
import fs from "fs";
import path from "path";
import Reflux from "reflux";
import Immutable from "immutable";
import axios from "axios";
import throttle from "lodash/function/throttle";
import findWhere from "lodash/collection/findWhere";
import { createSoundObj } from "../api";
import { soundActions } from "../actions";
import { dirname, toasterInstance } from "../utils";

let sounds = new Immutable.OrderedMap(JSON.parse(localStorage.getItem("sounds")));
let howls = new Immutable.Map();
let mute = false;

function updateIcon(s) {
  let trayIcon = findWhere(s, { playing: true }) ? "TrayActive" : "TrayIdle";
  ipc.sendChannel("update-icon", trayIcon);
}

var SoundStore = Reflux.createStore({
  listenables: [soundActions],
  init() {
    let sounds = JSON.parse(fs.readFileSync(path.join(dirname, "/data/sounds.json")));
    this.setSounds(sounds);
  },
  getInitialState() {
    return sounds.toArray();
  },
  getHowl(s) {
    return new Promise(resolve => {
      let currentHowl = howls.get(s.file);
      if (currentHowl) return resolve(currentHowl);
      createSoundObj(s)
        .then(res => howls = howls.set(s.file, res))
        .then(() => resolve(howls.get(s.file)));
    });
  },
  setSounds(data) {
    data.forEach(s => sounds = sounds.set(s.file, {...s, ...{ recentlyDownloaded: false }}));
    this.setAutoPlay();
    this.trigger(sounds.toArray());
  },
  setAutoPlay() {
    sounds.forEach(s => {
      if (s.playing) this.getHowl(s).then(howl => howl.play());
    });
    if (mute) this.onToggleMute(mute);
  },
  onToggleMute(muteToggle) {
    mute = muteToggle;
    sounds.forEach(s => this.getHowl(s).then(howl => howl.mute(muteToggle)));
  },
  onTogglePlayPause(sound) {
    sounds = sounds.update(sound.file, s => ({...s, ...{ playing: !s.playing }}));
    this.getHowl(sound).then(howl => {
      if (sound.playing) return howl.pause();
      howl.play();
      if (mute) toasterInstance().then(t => t.toast("Kakapo is currently muted!"));
    });
    this.trigger(sounds.toArray());
  },
  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, s => ({...s, ...{ volume: volume }}));
    this.getHowl(sound).then(howl => howl.volume(volume));
    this.trigger(sounds.toArray());
  },
  onEditSound(sound, newData) {
    var opts = { "editing": !sound.editing };
    if (typeof (newData) !== "undefined") opts = {...opts, ...newData};
    sounds = sounds.update(sound.file, s => ({...s, ...opts}));
    this.trigger(sounds.toArray());
  },
  onRemoveSound(sound) {
    // if (sound.source !== "soundcloudStream") {
    //   fs.unlinkSync(path.join(dirname, "/sounds/") + sound.file);
    // }
    this.getHowl(sound).then(howl => howl.unload());
    sounds = sounds.delete(sound.file);
    this.trigger(sounds.toArray());
  },
  soundDownloaded(sound) {
    toasterInstance().then(t => t.toast(`${sound.name} has been added.`));
    sounds = sounds.set(sound.file, {...sound, ...{ progress: 1 }});
    this.trigger(sounds.toArray());
    howls = howls.set(sound.file, createSoundObj(sound));
    if (mute) this.onToggleMute(mute);
  },

  // SoundCloud Listeners
  onGetSoundCloudURLCompleted(sound) {
    this.soundDownloaded(sound);
  },
  onGetSoundCloudURLFailed(error) {
    toasterInstance().then(t => t.toast(error));
  },

  // YouTube Listeners
  onGetYoutubeURLCompleted(sound) {
    this.soundDownloaded(sound);
  },
  onGetYoutubeURLFailed(error) {
    toasterInstance().then(t => t.toast(error));
  },

  // Custom url Listeners
  onGetCustomURLCompleted(sound) {
    this.soundDownloaded(sound);
  },
  onGetCustomURLFailed(error) {
    toasterInstance().then(t => t.toast(error));
  }
});

SoundStore.listen(s => updateIcon(s));

SoundStore.listen(throttle(data => fs.writeFile(path.join(dirname, "/data/sounds.json"), JSON.stringify(data)), 1000));

export default SoundStore;
