import fs from 'fs-extra';
import semver from 'semver';
import { pathConfig } from 'utils/';
import appConfig from 'config/';

export default {
  fromStorage() {
    let themeData;
    try {
      themeData = fs.readJsonSync(pathConfig.userThemeFile, { throws: false });
      if (semver.lt(themeData.version || '0.0.1', appConfig.themeVersion)) {
        themeData = {};
      }
    } catch (e) {
      themeData = {};
    }
    return themeData;
  },
  saveToStorage(data) {
    fs.outputJsonSync(pathConfig.userThemeFile, data);
  },
};
