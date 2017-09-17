import semver from 'semver';

export default {
  fromStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'));

    if (
      !theme ||
      semver.lt(
        theme.version || '0.0.1',
        process.env.npm_package_config_themeVersion
      )
    ) {
      return {};
    }

    return JSON.parse(localStorage.getItem('theme'));
  },
  saveToStorage(json) {
    localStorage.setItem('theme', json);
  }
};
