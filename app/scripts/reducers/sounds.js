import { Map } from 'immutable';
import { createSoundObj } from '../api';
import constants from '../constants';
import { createReducer, toasterInstance } from '../utils';
import { observableStore } from '../stores/configureStore';
import { bridgedSounds } from '../bridge';

let initialState = new Map();
let howls = new Map();
let mute = false;

function saveToStorage() {
  observableStore.subscribe(_x => {
    if (initialState === _x.sounds) return; // Still the same state
    let obj = new Map();
    _x.sounds.map(_s => obj = obj.set(_s.file, { ..._s }));
    bridgedSounds.saveToStorage(JSON.stringify(obj));
    initialState = _x.sounds;
  });
}

function init(state, defaultSounds) {
  saveToStorage();
  const newState = bridgedSounds.initWithDefault(defaultSounds.data || defaultSounds);
  return setSounds(newState);
}

function getHowl(_s) {
  return new Promise(resolve => {
    const currentHowl = howls.get(_s.file);
    if (currentHowl) return resolve(currentHowl);
    createSoundObj(_s)
      .then(res => howls = howls.set(_s.file, res))
      .then(() => resolve(howls.get(_s.file)));
  });
}

function toggleMute(state, muteToggle) {
  mute = muteToggle;
  state.map(_s => getHowl(_s).then(howl => howl.mute(muteToggle)));
  return state;
}

function setSounds(data) {
  let newState = new Map();
  data.map(_s => newState = newState.set(_s.file, { ..._s, ...{ recentlyDownloaded: false } }));
  data.map(_s => {
    if (_s.playing) {
      getHowl(_s).then(howl => howl.play()); // Autoplay
    }
  });
  if (mute) toggleMute(newState, mute); // Auto mute
  return newState;
}

function togglePlay(state, sound) {
  state = state.update(sound.file, _s => ({ ..._s, ...{ playing: !_s.playing } }));
  getHowl(sound).then(howl => {
    if (sound.playing) {
      howl.pause();
    } else {
      howl.play();
      if (mute) toasterInstance().then(_t => _t.toast('Kakapo is currently muted!'));
    }
  });
  return state;
}

function changeVolume(state, sound, volume) {
  state = state.update(sound.file, _s => ({ ..._s, ...{ volume: volume } }));
  getHowl(sound).then(howl => howl.volume(volume));
  return state;
}

function editSound(state, sound, newData) {
  let opts = { editing: !sound.editing };
  if (typeof (newData) !== 'undefined') opts = { ...opts, ...newData };
  state = state.update(sound.file, _s => ({ ..._s, ...opts }));
  return state;
}

function removeSound(state, sound) {
  getHowl(sound).then(howl => howl.unload());
  state = state.delete(sound.file);
  return state;
}

function soundDownloaded(state, sound) {
  toasterInstance().then(_t => _t.toast(`${sound.name} has been added.`));
  state = state.set(sound.file, { ...sound, ...{ progress: 1 } });
  howls = howls.set(sound.file, createSoundObj(sound));
  if (mute) toggleMute(state, mute);
  return state;
}

function soundError(state, error) {
  toasterInstance().then(_t => _t.toast(error));
}

export default createReducer(initialState, {
  [constants.SOUNDS_RECEIVED]: (state, action) => init(state, action.resp),
  [constants.SOUNDS_MUTE]: (state, action) => toggleMute(state, action.mute),
  [constants.SOUNDS_PLAY]: (state, action) => togglePlay(state, action.sound),
  [constants.SOUNDS_VOLUME]: (state, action) => changeVolume(state, action.sound, action.volume),
  [constants.SOUNDS_EDIT]: (state, action) => editSound(state, action.sound, action.data),
  [constants.SOUNDS_REMOVE]: (state, action) => removeSound(state, action.sound),
  [constants.SOUNDS_DOWNLOADED]: (state, action) => soundDownloaded(state, action.sound),
  [constants.SOUNDS_ERROR]: (state, action) => soundError(state, action.error)
});
