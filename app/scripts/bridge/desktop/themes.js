import fs from 'fs-extra';
import { pathConfig } from '../../utils';

const actions = {
  fromStorage() {
    let themeData;
    try {
      themeData = fs.readJsonSync(pathConfig.userThemeFile, { throws: false });
    } catch(e) {
      themeData = null;
    }
    return themeData;
  },
  saveToStorage(json) {
    fs.writeFile(pathConfig.userThemeFile, json);
  }
};

export default actions;
