import { newSoundClass } from '../../classes';
import { validHowl } from '../../utils';

const actions = {
  getCustomURL(data) {
    return new Promise((resolve, reject) => {
      if (data.source !== 'file' && !validHowl(data.url)) {
        return reject(new Error(validHowl(data.url, true)));
      }

      resolve({ ...newSoundClass, ... {
        file: data.url,
        img: data.icon,
        name: data.name,
        progress: 0,
        source: data.source,
        tags: ''
      } });
    });
  }
};

export default actions;
