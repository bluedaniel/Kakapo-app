import { validHowl, newSoundObj, noop } from 'utils/';

export default {
  getCustomFile: noop,
  getCustomURL(data) {
    if (data.source !== 'file' && !validHowl(data.file)) {
      throw new Error(validHowl(data.file, true));
    }
    return { ...newSoundObj, ...data };
  },
};
