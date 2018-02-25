import { safe } from 'utils/';

export default {
  getItem(option) {
    const data = {
      lang: localStorage.getItem('lang') || 'en',
      mute: localStorage.getItem('mute'),
    };
    const obj = data[option];
    return safe(() => JSON.parse(obj), obj);
  },
  setItem(option, value) {
    if (option === 'updateStatus') return;
    localStorage.setItem(option, JSON.stringify(value));
  },
};
