import {
  __,
  compose,
  empty,
  filter,
  lensProp,
  mapObjIndexed,
  merge,
  omit,
  over,
  prop,
  propEq,
  reduce,
  set,
} from 'ramda';
import { bridgedSounds, bridgedSettings } from 'kakapoBridge';
import { createSoundObj } from 'api/';
import { soundTypes } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {};
let defaultSounds = {};
let howls = {};

const getHowl = _s =>
  new Promise(resolve => {
    const currentHowl = prop(_s.file, howls);
    if (currentHowl) return resolve(currentHowl);
    return createSoundObj(_s)
      .then(res => {
        howls = set(lensProp(_s.file), res, howls);
      })
      .then(() => resolve(prop(_s.file, howls)));
  });

const toggleMute = state => {
  const mute = bridgedSettings.getItem('mute');
  mapObjIndexed(_s => getHowl(_s).then(howl => howl.mute(mute)), state);
  return state;
};

const setSounds = data => {
  const newState = reduce(
    (acc, curr) => {
      if (curr.playing) getHowl(curr).then(howl => howl.play()); // Autoplay
      return set(
        lensProp(curr.file),
        merge(curr, { recentlyDownloaded: false }),
        acc
      );
    },
    {},
    data
  );
  toggleMute(newState);
  return newState;
};

const resetSounds = (state, { clear }) => {
  mapObjIndexed(
    _s =>
      getHowl(_s).then(howl => {
        if (howl) howl.unload(); // Remove sound object
      }),
    state
  );
  howls = empty(howls);
  return clear ? empty(state) : setSounds(defaultSounds);
};

const togglePlay = (state, { sound }) => {
  const newState = over(
    lensProp(sound.file),
    _s => merge(_s, { playing: !_s.playing }),
    state
  );
  getHowl(sound).then(howl => {
    if (sound.playing) {
      howl.pause();
    } else {
      howl.play();
    }
  });
  return newState;
};

const changeVolume = (state, { sound, volume }) => {
  getHowl(sound).then(howl => howl.volume(volume));
  return over(lensProp(sound.file), merge(__, { volume }), state);
};

const editSound = (state, { sound, data }) => {
  let opts = { editing: !sound.editing };
  if (typeof data !== 'undefined') opts = merge(opts, data);
  return over(lensProp(sound.file), merge(__, opts), state);
};

const removeSound = (state, { sound }) => {
  getHowl(sound).then(howl => howl.unload());
  if (__DESKTOP__ && sound.source !== 'file')
    bridgedSounds.removeFromDisk(sound);
  return omit([sound.file], state);
};

const soundDownloaded = (state, { sound }) => {
  const newSound = merge(sound, { progress: 1 });
  const newState = set(lensProp(newSound.file), newSound, state);
  howls = set(lensProp(newSound.file), createSoundObj(newSound), howls);
  if (newSound.playing) getHowl(newSound).then(howl => howl.play());
  toggleMute(newState);
  return newState;
};

const soundDownloading = (state, { sound }) =>
  set(lensProp(sound.file), sound, state);

const init = (state, { resp }) => {
  defaultSounds = resp.data || resp;

  return compose(
    setSounds,
    filter(propEq('progress', 1)),
    bridgedSounds.initWithDefault
  )(defaultSounds);
};

export default createReducer(initialState, {
  [soundTypes.REQUEST_SUCCESS]: init,
  [soundTypes.MUTE]: toggleMute,
  [soundTypes.PLAY]: togglePlay,
  [soundTypes.VOLUME]: changeVolume,
  [soundTypes.EDIT]: editSound,
  [soundTypes.REMOVE]: removeSound,
  [soundTypes.ADD_SOUND_DOWNLOADING]: soundDownloading,
  [soundTypes.ADD_SOUND_COMPLETE]: soundDownloaded,
  [soundTypes.RESET]: resetSounds,
});
