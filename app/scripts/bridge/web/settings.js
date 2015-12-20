export default {
  getItem(option) {
    const data = {
      lang: localStorage.getItem('lang') || 'en'
    };
    return data[option];
  },
  setItem(option, value) {
    localStorage.setItem(option, JSON.stringify(value));
  }
};
