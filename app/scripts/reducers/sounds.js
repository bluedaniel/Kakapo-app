import {
  compose,
  filter,
  propEq,
  mapObjIndexed,
  set,
  lensProp,
  over,
  prop,
  omit
} from 'ramda';
import { bridgedSounds, bridgedSettings } from 'kakapoBridge';
import { createSoundObj } from 'api/';
import { soundTypes } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {};
let defaultSounds = {};
let howls = {};

const soundReducers = {
  init(state, initSounds) {
    defaultSounds = initSounds.data || initSounds;

    const sounds = compose(
      filter(propEq('progress', 1)),
      bridgedSounds.initWithDefault
    )(defaultSounds);

    return this.setSounds(sounds);
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
    const mute = bridgedSettings.getItem('mute');
    mapObjIndexed(_s => this._getHowl(_s).then(howl => howl.mute(mute)), state);
    return state;
  },

  changeVolume(state, sound, volume) {
    this._getHowl(sound).then(howl => howl.volume(volume));
    return over(lensProp(sound.file), _s => ({ ..._s, volume }), state);
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
  }
};

export default createReducer(initialState, {
  [soundTypes.REQUEST_SUCCESS]: (state, { resp }) =>
    soundReducers.init(state, resp),
  [soundTypes.MUTE]: state => soundReducers.toggleMute(state),
  [soundTypes.PLAY]: (state, { sound }) =>
    soundReducers.togglePlay(state, sound),
  [soundTypes.VOLUME]: (state, { sound, volume }) =>
    soundReducers.changeVolume(state, sound, volume),
  [soundTypes.EDIT]: (state, { sound, data }) =>
    soundReducers.editSound(state, sound, data),
  [soundTypes.REMOVE]: (state, { sound }) =>
    soundReducers.removeSound(state, sound),
  [soundTypes.ADD_SOUND_DOWNLOADING]: (state, { sound }) =>
    soundReducers.soundDownloading(state, sound),
  [soundTypes.ADD_SOUND_COMPLETE]: (state, { sound, notify }) =>
    soundReducers.soundDownloaded(state, sound, notify),
  [soundTypes.RESET]: (state, { clear }) =>
    soundReducers.resetSounds(state, clear)
});
