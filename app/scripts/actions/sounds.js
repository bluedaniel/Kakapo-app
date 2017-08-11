import { Subject } from 'rxjs/Subject';
import constants from 'actions/constants/';
import { getYoutubeURL, getCustomURL, getSoundCloudURL } from 'api/';

const {
  SOUNDS_REQUEST,
  SOUNDS_MUTE,
  SOUNDS_PLAY,
  SOUNDS_VOLUME,
  SOUNDS_EDIT,
  SOUNDS_REMOVE,
  SOUNDS_RECEIVED,
  SOUNDS_DOWNLOADING,
  SOUNDS_DOWNLOADED,
  SOUNDS_ERROR,
  SOUNDS_RESET,
  SOUNDS_ADD_LOCAL
} = constants;

const actions = {
  soundsInit: () => ({ type: SOUNDS_REQUEST }),
  soundsRequestSuccess: resp => ({ type: SOUNDS_RECEIVED, resp }),

  soundsMute: () => ({ type: SOUNDS_MUTE }),
  soundsPlay: sound => ({ type: SOUNDS_PLAY, sound }),
  soundsVolume: (sound, volume) => ({ type: SOUNDS_VOLUME, sound, volume }),
  soundsEdit: (sound, data) => ({ type: SOUNDS_EDIT, sound, data }),
  soundsRemove: sound => ({ type: SOUNDS_REMOVE, sound }),
  addLocalSound: file => ({ type: SOUNDS_ADD_LOCAL, file }),

  addSound: (service, data) => dispatch => {
    const subject = new Subject().throttleTime(250).distinctUntilChanged();

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
