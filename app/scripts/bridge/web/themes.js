import semver from 'semver';
import appConfig from 'config/';

export default {
  fromStorage() {
    const theme = JSON.parse(localStorage.getItem('theme')) || {};

    if (semver.lt(theme.version || '0.0.1', appConfig.themeVersion)) {
      return {};
    }
    return theme;
  },
  saveToStorage(data) {
    localStorage.setItem('theme', JSON.stringify(data));
  },
};
