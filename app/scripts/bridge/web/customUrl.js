import { validHowl, newSoundObj } from 'utils/';

const actions = {
  getCustomFile() {},
  getCustomURL(subject, data) {
    if (data.source !== 'file' && !validHowl(data.file)) {
      subject.error(validHowl(data.file, true));
    } else {
      subject.next({ ...newSoundObj, ...data });
      subject.complete();
    }
  }
};

export default actions;
