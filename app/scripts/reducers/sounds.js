import {
  __,
  empty,
  filter,
  lensProp,
  mapObjIndexed,
  merge,
  omit,
  over,
  pipe,
  prop,
  propEq,
  reduce,
  set,
} from 'ramda';
import { bridgedSounds, bridgedSettings } from 'kakapoBridge';
import { createSoundObj } from 'api/';
import { soundActions } from 'actions/';
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

const resetSounds = (state, { payload: { clear } }) => {
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

const togglePlay = (state, { payload: { sound } }) => {
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

const changeVolume = (state, { payload: { sound, volume } }) => {
  getHowl(sound).then(howl => howl.volume(volume));
  return over(lensProp(sound.file), merge(__, { volume }), state);
};

const editSound = (state, { payload: { sound, data } }) => {
  let opts = { editing: !sound.editing };
  if (typeof data !== 'undefined') opts = merge(opts, data);
  return over(lensProp(sound.file), merge(__, opts), state);
};

const removeSound = (state, { payload: { sound } }) => {
  getHowl(sound).then(howl => howl.unload());
  if (__DESKTOP__ && sound.source !== 'file')
    bridgedSounds.removeFromDisk(sound);
  return omit([sound.file], state);
};

const soundDownloaded = (state, { payload: { sound } }) => {
  const newSound = merge(sound, { progress: 1 });
  const newState = set(lensProp(newSound.file), newSound, state);
  howls = set(lensProp(newSound.file), createSoundObj(newSound), howls);
  if (newSound.playing) getHowl(newSound).then(howl => howl.play());
  toggleMute(newState);
  return newState;
};

const soundDownloading = (state, { payload: { sound } }) =>
  set(lensProp(sound.file), sound, state);

const init = (state, { payload: { resp } }) => {
  defaultSounds = resp.data || resp;

  return pipe(
    bridgedSounds.initWithDefault,
    filter(propEq('progress', 1)),
    setSounds
  )(defaultSounds);
};

export default createReducer(initialState, {
  [soundActions.SOUNDS_REQUEST_SUCCESS]: init,
  [soundActions.SOUNDS_MUTE]: toggleMute,
  [soundActions.SOUNDS_PLAY]: togglePlay,
  [soundActions.SOUNDS_VOLUME]: changeVolume,
  [soundActions.SOUNDS_EDIT]: editSound,
  [soundActions.SOUNDS_REMOVE]: removeSound,
  [soundActions.SOUNDS_ADD_SOUND_DOWNLOADING]: soundDownloading,
  [soundActions.SOUNDS_ADD_SOUND_COMPLETE]: soundDownloaded,
  [soundActions.SOUNDS_RESET]: resetSounds,
});
