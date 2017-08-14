import { eventChannel, END } from 'redux-saga';
import { validHowl, newSoundObj, noop } from 'utils/';

export default {
  getCustomFile: noop,
  getCustomURL(data) {
    return eventChannel(emit => {
      if (data.source !== 'file' && !validHowl(data.file)) {
        emit(Error(validHowl(data.file, true)));
      } else {
        console.log({ ...newSoundObj, ...data });
        emit({ ...newSoundObj, ...data });
        emit(END);
      }
      return noop;
    });
  }
};
