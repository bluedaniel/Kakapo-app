import { newSoundClass } from 'classes/';
import { validHowl } from 'utils/';

const actions = {
  getCustomFile() {

  },
  getCustomURL(subject, data) {
    if (data.source !== 'file' && !validHowl(data.file)) {
      subject.error(validHowl(data.file, true));
    } else {
      subject.next({ ...newSoundClass, ...data });
      subject.complete();
    }
  }
};

export default actions;
