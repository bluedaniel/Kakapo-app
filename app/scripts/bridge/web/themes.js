const actions = {
  fromStorage() {
    return JSON.parse(localStorage.getItem('theme'));
  },
  saveToStorage(json) {
    localStorage.setItem('theme', json);
  }
};

export default actions;
