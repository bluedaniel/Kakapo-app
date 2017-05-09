import { Map } from 'immutable';
import { bridgedSounds } from 'kakapoBridge';
import { createSoundObj } from 'api/';
import constants from 'constants/';
import { createReducer } from 'utils/';
import { observableStore, store } from 'stores/configureStore';

const {
  SOUNDS_MUTE,
  SOUNDS_PLAY,
  SOUNDS_VOLUME,
  SOUNDS_EDIT,
  SOUNDS_REMOVE,
  SOUNDS_RECEIVED,
  SOUNDS_DOWNLOADING,
  SOUNDS_DOWNLOADED,
  SOUNDS_ERROR,
  SOUNDS_RESET
} = constants;

export let initialState = new Map();
let defaultSounds = new Map();
let howls = new Map();

const muteStatus = () => store.getState().settings.mute;

const soundReducers = {
  init(state, initSounds) {
    this.saveToStorage();
    defaultSounds = initSounds.data || initSounds;
    const newState = bridgedSounds.initWithDefault(defaultSounds);
    return this.setSounds(newState);
  },

  _getHowl(_s) {
    return new Promise(resolve => {
      const currentHowl = howls.get(_s.file);
      if (currentHowl) return resolve(currentHowl);
      return createSoundObj(_s)
        .then(res => {
          howls = howls.set(_s.file, res);
        })
        .then(() => resolve(howls.get(_s.file)));
    });
  },

  setSounds(data) {
    let newState = new Map();
    data.map(_s => {
      if (_s.playing) this._getHowl(_s).then(howl => howl.play()); // Autoplay
      newState = newState.set(_s.file, { ..._s, recentlyDownloaded: false });
      return newState;
    });
    this.toggleMute(newState); // Auto mute
    return newState;
  },

  resetSounds(state, clear) {
    state.map(_s =>
      this._getHowl(_s).then(howl => {
        if (howl) howl.unload(); // Remove sound object
      })
    );
    howls = howls.clear();
    if (clear) return state.clear();
    return this.setSounds(defaultSounds);
  },

  togglePlay(state, sound) {
    state = state.update(sound.file, _s => ({ ..._s, playing: !_s.playing }));
    this._getHowl(sound).then(howl => {
      if (sound.playing) {
        howl.pause();
      } else {
        howl.play();
      }
    });
    return state;
  },

  toggleMute(state) {
    state.map(_s => this._getHowl(_s).then(howl => howl.mute(muteStatus())));
    return state;
  },

  changeVolume(state, sound, volume) {
    state = state.update(sound.file, _s => ({ ..._s, volume }));
    this._getHowl(sound).then(howl => howl.volume(volume));
    return state;
  },

  editSound(state, sound, newData) {
    let opts = { editing: !sound.editing };
    if (typeof newData !== 'undefined') opts = { ...opts, ...newData };
    state = state.update(sound.file, _s => ({ ..._s, ...opts }));
    return state;
  },

  removeSound(state, sound) {
    this._getHowl(sound).then(howl => howl.unload());
    state = state.delete(sound.file);
    if (__DESKTOP__ && sound.source !== 'file')
      bridgedSounds.removeFromDisk(sound);
    return state;
  },

  soundDownloaded(state, sound) {
    sound = { ...sound, progress: 1 };
    state = state.set(sound.file, sound);
    howls = howls.set(sound.file, createSoundObj(sound));
    if (sound.playing) this._getHowl(sound).then(howl => howl.play());
    this.toggleMute(state);
    return state;
  },

  soundDownloading(state, sound) {
    state = state.set(sound.file, { ...sound });
    return state;
  },

  soundError(state) {
    return state;
  },

  saveToStorage() {
    observableStore.subscribe(_x => {
      if (initialState === _x.sounds) return; // Still the same state
      let obj = new Map();
      _x.sounds.map(_s => {
        obj = obj.set(_s.file, { ..._s });
        return _s;
      });
      bridgedSounds.saveToStorage(JSON.stringify(obj));
      initialState = _x.sounds;
    });
  }
};

export default createReducer(initialState, {
  [SOUNDS_RECEIVED]: (state, { resp }) => soundReducers.init(state, resp),
  [SOUNDS_MUTE]: state => soundReducers.toggleMute(state),
  [SOUNDS_PLAY]: (state, { sound }) => soundReducers.togglePlay(state, sound),
  [SOUNDS_VOLUME]: (state, { sound, volume }) =>
    soundReducers.changeVolume(state, sound, volume),
  [SOUNDS_EDIT]: (state, { sound, data }) =>
    soundReducers.editSound(state, sound, data),
  [SOUNDS_REMOVE]: (state, { sound }) =>
    soundReducers.removeSound(state, sound),
  [SOUNDS_DOWNLOADING]: (state, { sound }) =>
    soundReducers.soundDownloading(state, sound),
  [SOUNDS_DOWNLOADED]: (state, { sound, notify }) =>
    soundReducers.soundDownloaded(state, sound, notify),
  [SOUNDS_ERROR]: (state, { err }) => soundReducers.soundError(state, err),
  [SOUNDS_RESET]: (state, { clear }) => soundReducers.resetSounds(state, clear)
});
