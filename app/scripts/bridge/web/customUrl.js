import { newSoundClass } from '../../classes';
import { validHowl } from '../../utils';

const actions = {
  getCustomFile() {

  },
  getCustomURL(data) {
    return new Promise((resolve, reject) => {
      if (data.source !== 'file' && !validHowl(data.url)) {
        return reject(new Error(validHowl(data.url, true)));
      }

      resolve({ ...newSoundClass, ...data });
    });
  }
};

export default actions;
