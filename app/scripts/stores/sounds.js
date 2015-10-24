import ipc from "ipc";
import fs from "fs-extra";
import path from "path";
import Reflux from "reflux";
import {Map} from "immutable";
import throttle from "lodash/function/throttle";
import { createSoundObj } from "../api";
import { soundActions } from "../actions";
import { toasterInstance, pathConfig } from "../utils";

let sounds = new Map();
let howls = new Map();
let mute = false;

const SoundStore = Reflux.createStore({
  listenables: [soundActions],
  init() {
    let _s = fs.readFileSync(pathConfig.soundFile);
    try {
      _s = fs.readFileSync(pathConfig.userSoundFile);
    } catch (err) {
      fs.writeFile(pathConfig.userSoundFile, _s);
    }

    this.setSounds(JSON.parse(_s));
  },

  getInitialState() {
    return sounds;
  },

  getHowl(_s) {
    return new Promise(resolve => {
      const currentHowl = howls.get(_s.file);
      if (currentHowl) return resolve(currentHowl);
      createSoundObj(_s)
        .then(res => howls = howls.set(_s.file, res))
        .then(() => resolve(howls.get(_s.file)));
    });
  },

  setSounds(data) {
    data.forEach(_s => sounds = sounds.set(_s.file, {..._s, ...{ recentlyDownloaded: false }}));
    this.setAutoPlay();
    this.trigger(sounds);
  },

  setAutoPlay() {
    sounds.forEach(_s => {
      if (_s.playing) this.getHowl(_s).then(howl => howl.play());
    });
    if (mute) this.onToggleMute(mute);
  },

  onToggleMute(muteToggle) {
    mute = muteToggle;
    sounds.forEach(_s => this.getHowl(_s).then(howl => howl.mute(muteToggle)));
  },

  onTogglePlayPause(sound) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ playing: !_s.playing }}));
    this.getHowl(sound).then(howl => {
      if (sound.playing) return howl.pause();
      howl.play();
      if (mute) toasterInstance().then(_t => _t.toast("Kakapo is currently muted!"));
    });
    this.trigger(sounds);
  },

  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ volume: volume }}));
    this.getHowl(sound).then(howl => howl.volume(volume));
    this.trigger(sounds);
  },

  onEditSound(sound, newData) {
    let opts = { editing: !sound.editing };
    if (typeof (newData) !== "undefined") opts = {...opts, ...newData};
    sounds = sounds.update(sound.file, _s => ({..._s, ...opts}));
    this.trigger(sounds);
  },

  onRemoveSound(sound) {
    this.getHowl(sound).then(howl => howl.unload());
    sounds = sounds.delete(sound.file);
    if (sound.source !== "file") fs.unlinkSync(sound.file);
    this.trigger(sounds);
  },

  soundProgressed(sound, progress) {
    sounds = sounds.set(sound.file, {...sound, ...{ progress: progress }});
    this.trigger(sounds);
  },

  soundDownloaded(sound) {
    toasterInstance().then(_t => _t.toast(`${sound.name} has been added.`));
    sounds = sounds.set(sound.file, {...sound, ...{ progress: 1 }});
    this.trigger(sounds);
    howls = howls.set(sound.file, createSoundObj(sound));
    if (mute) this.onToggleMute(mute);
  },

  // SoundCloud Listeners
  onGetSoundCloudURLProgressed(sound, progress) {
    this.soundProgressed(sound, progress);
  },

  onGetSoundCloudURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetSoundCloudURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // YouTube Listeners
  onGetYoutubeURLProgressed(sound, progress) {
    this.soundProgressed(sound, progress);
  },

  onGetYoutubeURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetYoutubeURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // CustomUrl Listeners
  onGetCustomURLProgressed(sound, progress) {
    this.soundProgressed(sound, progress);
  },

  onGetCustomURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetCustomURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // CustomFile Listeners
  onGetCustomFileCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetCustomFileFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  }
});

SoundStore.listen(() => {
  let trayIcon = "TrayIdle";
  sounds.forEach(_s => {
    if (_s.playing) trayIcon = "TrayActive";
  });
  ipc.sendChannel("update-icon", trayIcon);
});

SoundStore.listen(throttle(data => fs.writeFile(pathConfig.userSoundFile, JSON.stringify(data.toArray())), 1000));

export default SoundStore;
