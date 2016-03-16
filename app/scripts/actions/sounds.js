import { EventEmitter } from 'events';
import constants from 'constants/';
import { getDefaultSounds, getYoutubeURL, getCustomFile,
  getCustomURL, getSoundCloudURL } from 'api/';

const {
  SOUNDS_MUTE, SOUNDS_PLAY, SOUNDS_VOLUME, SOUNDS_EDIT, SOUNDS_REMOVE,
  SOUNDS_RECEIVED, SOUNDS_ADD_CUSTOM, SOUNDS_ADD_YOUTUBE, SOUNDS_ADD_SOUNDCLOUD,
  SOUNDS_DOWNLOADING, SOUNDS_DOWNLOADED, SOUNDS_ERROR, SOUNDS_RESET
} = constants;

const actions = {
  soundsInit: () => dispatch => dispatch(actions.fetchSounds()),
  soundsMute: mute => ({ type: SOUNDS_MUTE, mute }),
  soundsPlay: sound => ({ type: SOUNDS_PLAY, sound }),
  soundsVolume: (sound, volume) => ({ type: SOUNDS_VOLUME, sound, volume }),
  soundsEdit: (sound, data) => ({ type: SOUNDS_EDIT, sound, data }),
  soundsRemove: sound => ({ type: SOUNDS_REMOVE, sound }),

  fetchSounds: () => dispatch => getDefaultSounds()
    .then(resp => dispatch(actions.fetchSoundsComplete(resp))),
  fetchSoundsComplete: resp => ({ type: SOUNDS_RECEIVED, resp }),

  addLocalSound: (name, path) => dispatch =>
    dispatch(actions.addSoundComplete(getCustomFile(name, path))),

  addSound: (service, data, notify = true) => dispatch => {
    let opts = { provider: getCustomURL, type: SOUNDS_ADD_CUSTOM };
    if (service === 'youtube') {
      opts = { provider: getYoutubeURL, type: SOUNDS_ADD_YOUTUBE };
    }
    if (service === 'soundcloud') {
      opts = { provider: getSoundCloudURL, type: SOUNDS_ADD_SOUNDCLOUD };
    }
    const fetchFunc = opts.provider(data);

    if (fetchFunc instanceof Promise) {
      fetchFunc
      .catch(err => dispatch(actions.addSoundError(err)))
      .then(resp => {
        if (resp.err) return;
        dispatch(actions.addSoundComplete(resp, notify));
      });
    } else if (fetchFunc instanceof EventEmitter) {
      fetchFunc
      .on('error', err => dispatch(actions.addSoundError(err)))
      .on('progress', resp => dispatch(actions.addSoundDownloading(resp)))
      .on('finish', resp => dispatch(actions.addSoundComplete(resp, notify)));
    }
  },

  addSoundDownloading: sound => ({ type: SOUNDS_DOWNLOADING, sound }),
  addSoundComplete: (sound, notify = true) =>
    ({ type: SOUNDS_DOWNLOADED, sound, notify }),
  addSoundError: err => ({ type: SOUNDS_ERROR, err }),

  resetSounds: clear => ({ type: SOUNDS_RESET, clear })
};

export default actions;
