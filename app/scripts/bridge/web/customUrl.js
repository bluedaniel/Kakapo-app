import { eventChannel, END } from 'redux-saga';
import { validHowl, newSoundObj, noop } from 'utils/';

const actions = {
  getCustomFile: noop,
  getCustomURL(data) {
    return eventChannel(emitter => {
      if (data.source !== 'file' && !validHowl(data.file)) {
        throw new Error(validHowl(data.file, true));
      } else {
        emitter({ ...newSoundObj, ...data });
        emitter(END);
      }
      return noop;
    });
  }
};

export default actions;
