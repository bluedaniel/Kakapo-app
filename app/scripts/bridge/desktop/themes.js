import fs from 'fs-extra';
import semver from 'semver';
import { pathConfig } from 'utils/';

export default {
  fromStorage() {
    let themeData;
    try {
      themeData = fs.readJsonSync(pathConfig.userThemeFile, { throws: false });
      if (
        semver.lt(
          themeData.version || '0.0.1',
          process.env.npm_package_config_themeVersion
        )
      ) {
        themeData = {};
      }
    } catch (e) {
      themeData = {};
    }
    return themeData;
  },
  saveToStorage(json) {
    fs.writeFileSync(pathConfig.userThemeFile, json);
  }
};
