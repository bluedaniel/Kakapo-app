import { mapObjIndexed, set, lensProp, over, prop, omit, reduce } from 'ramda';
import { bridgedSounds } from 'kakapoBridge';
import { createSoundObj } from 'api/';
import constants from 'actions/constants/';
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

export let initialState = {};
let defaultSounds = {};
let howls = {};

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
      const currentHowl = prop(_s.file, howls);
      if (currentHowl) return resolve(currentHowl);
      return createSoundObj(_s)
        .then(res => {
          howls = set(lensProp(_s.file), res, howls);
        })
        .then(() => resolve(prop(_s.file, howls)));
    });
  },

  setSounds(data) {
    let newState = {};
    data.map(_s => {
      if (_s.playing) this._getHowl(_s).then(howl => howl.play()); // Autoplay
      newState = set(
        lensProp(_s.file),
        { ..._s, recentlyDownloaded: false },
        newState
      );
      return newState;
    });
    this.toggleMute(newState); // Auto mute
    return newState;
  },

  resetSounds(state, clear) {
    mapObjIndexed(
      _s =>
        this._getHowl(_s).then(howl => {
          if (howl) howl.unload(); // Remove sound object
        }),
      state
    );
    howls = {};
    if (clear) return {};
    return this.setSounds(defaultSounds);
  },

  togglePlay(state, sound) {
    state = over(
      lensProp(sound.file),
      _s => ({ ..._s, playing: !_s.playing }),
      state
    );
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
    return mapObjIndexed(
      _s => this._getHowl(_s).then(howl => howl.mute(muteStatus())),
      state
    );
  },

  changeVolume(state, sound, volume) {
    state = over(lensProp(sound.file), _s => ({ ..._s, volume }), state);
    this._getHowl(sound).then(howl => howl.volume(volume));
    return state;
  },

  editSound(state, sound, newData) {
    let opts = { editing: !sound.editing };
    if (typeof newData !== 'undefined') opts = { ...opts, ...newData };
    return over(lensProp(sound.file), _s => ({ ..._s, ...opts }), state);
  },

  removeSound(state, sound) {
    this._getHowl(sound).then(howl => howl.unload());
    state = omit([sound.file], state);
    if (__DESKTOP__ && sound.source !== 'file')
      bridgedSounds.removeFromDisk(sound);
    return state;
  },

  soundDownloaded(state, sound) {
    sound = { ...sound, progress: 1 };
    state = set(lensProp(sound.file), sound, state);
    howls = set(lensProp(sound.file), createSoundObj(sound), howls);
    if (sound.playing) this._getHowl(sound).then(howl => howl.play());
    this.toggleMute(state);
    return state;
  },

  soundDownloading(state, sound) {
    return set(lensProp(sound.file), { ...sound }, state);
  },

  soundError(state) {
    return state;
  },

  saveToStorage() {
    observableStore.subscribe(_x => {
      if (initialState === _x.sounds) return; // Still the same state
      const obj = reduce(
        (acc, curr) => set(lensProp(curr.file), { ...curr }, acc),
        {},
        _x.sounds
      );
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
