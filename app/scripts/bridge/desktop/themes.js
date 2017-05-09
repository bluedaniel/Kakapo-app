import fs from 'fs-extra';
import semver from 'semver';
import { pathConfig } from 'utils/';
import packageJson from '../../../../package.json';

export default {
  fromStorage() {
    let themeData;
    try {
      themeData = fs.readJsonSync(pathConfig.userThemeFile, { throws: false });
      if (
        semver.lt(themeData.version || '0.0.1', packageJson.config.themeVersion)
      ) {
        themeData = {};
      }
    } catch (e) {
      themeData = {};
    }
    return themeData;
  },
  saveToStorage(json) {
    fs.writeFile(pathConfig.userThemeFile, json);
  }
};
