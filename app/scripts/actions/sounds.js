import { EventEmitter } from 'events';
import constants from 'constants/';
import { getDefaultSounds, getYoutubeURL, getCustomFile, getCustomURL, getSoundCloudURL } from 'api/';

const actions = {
  soundsInit: () => dispatch => dispatch(actions.fetchSounds()),
  soundsMute: mute => ({ type: constants.SOUNDS_MUTE, mute }),
  soundsPlay: sound => ({ type: constants.SOUNDS_PLAY, sound }),
  soundsVolume: (sound, volume) => ({ type: constants.SOUNDS_VOLUME, sound, volume }),
  soundsEdit: (sound, data) => ({ type: constants.SOUNDS_EDIT, sound, data }),
  soundsRemove: sound => ({ type: constants.SOUNDS_REMOVE, sound }),

  fetchSounds: () => dispatch => getDefaultSounds().then(resp => dispatch(actions.fetchSoundsComplete(resp))),
  fetchSoundsComplete: resp => ({ type: constants.SOUNDS_RECEIVED, resp }),

  addLocalSound: (name, path) => dispatch => {
    let newSound = getCustomFile(name, path);
    dispatch(actions.addSoundComplete(newSound));
  },

  addSound: (service, data, notify=true) => dispatch => {
    let opts = { provider: getCustomURL, type: constants.SOUNDS_ADD_CUSTOM }; // Kakapo/custom default
    if (service === 'youtube') opts = { provider: getYoutubeURL, type: constants.SOUNDS_ADD_YOUTUBE };
    if (service === 'soundcloud') opts = { provider: getSoundCloudURL, type: constants.SOUNDS_ADD_SOUNDCLOUD };
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

  addSoundDownloading: sound => ({ type: constants.SOUNDS_DOWNLOADING, sound }),
  addSoundComplete: (sound, notify=true) => ({ type: constants.SOUNDS_DOWNLOADED, sound, notify }),
  addSoundError: err => ({ type: constants.SOUNDS_ERROR, err }),

  resetSounds: clear => ({ type: constants.SOUNDS_RESET, clear })
};

export default actions;
