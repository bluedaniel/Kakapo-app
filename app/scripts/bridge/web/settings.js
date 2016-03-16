
const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export default {
  getItem(option) {
    const data = {
      lang: localStorage.getItem('lang') || 'en',
      mute: localStorage.getItem('mute')
    };
    const obj = data[option];
    return isJson(obj) ? JSON.parse(obj) : obj;
  },
  setItem(option, value) {
    localStorage.setItem(option, JSON.stringify(value));
  }
};
