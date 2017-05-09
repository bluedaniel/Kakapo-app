import Rx from 'rxjs';
import constants from 'constants/';
import {
  getDefaultSounds,
  getYoutubeURL,
  getCustomFile,
  getCustomURL,
  getSoundCloudURL
} from 'api/';

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

const actions = {
  soundsInit: () => dispatch => dispatch(actions.fetchSounds()),
  soundsMute: () => ({ type: SOUNDS_MUTE }),
  soundsPlay: sound => ({ type: SOUNDS_PLAY, sound }),
  soundsVolume: (sound, volume) => ({ type: SOUNDS_VOLUME, sound, volume }),
  soundsEdit: (sound, data) => ({ type: SOUNDS_EDIT, sound, data }),
  soundsRemove: sound => ({ type: SOUNDS_REMOVE, sound }),

  fetchSounds: () => dispatch =>
    getDefaultSounds().then(resp =>
      dispatch(actions.fetchSoundsComplete(resp))
    ),
  fetchSoundsComplete: resp => ({ type: SOUNDS_RECEIVED, resp }),

  addLocalSound: (name, path) => dispatch =>
    dispatch(actions.addSoundComplete(getCustomFile(name, path))),

  addSound: (service, data) => dispatch => {
    const subject = new Rx.Subject().throttleTime(250).distinctUntilChanged();

    let rxData;
    subject.subscribe({
      next: resp => {
        rxData = resp;
        dispatch(actions.addSoundDownloading(resp));
      },
      error: err => dispatch(actions.addSoundError(err)),
      complete: () => dispatch(actions.addSoundComplete(rxData, false))
    });

    if (service === 'youtube') {
      getYoutubeURL(subject, data);
    } else if (service === 'soundcloud') {
      getSoundCloudURL(subject, data);
    } else {
      getCustomURL(subject, data);
    }
  },

  addSoundDownloading: sound => ({ type: SOUNDS_DOWNLOADING, sound }),
  addSoundComplete: sound => ({ type: SOUNDS_DOWNLOADED, sound }),
  addSoundError: err => ({ type: SOUNDS_ERROR, err }),

  resetSounds: clear => ({ type: SOUNDS_RESET, clear })
};

export default actions;
