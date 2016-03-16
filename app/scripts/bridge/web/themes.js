import semver from 'semver';
import packageJson from '../../../../package.json';

export default {
  fromStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'));

    if (!theme || semver.lt(theme.version || '0.0.1', packageJson.config.themeVersion)) {
      return {};
    }

    return JSON.parse(localStorage.getItem('theme'));
  },
  saveToStorage(json) {
    localStorage.setItem('theme', json);
  }
};
