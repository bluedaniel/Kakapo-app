import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { pathConfig } from 'utils/';

export default {
  _fromSettings() {
    let appSettings = fs.readJsonSync(pathConfig.settingsFile, { throws: false });
    try {
      appSettings = fs.readJsonSync(pathConfig.userSettingsFile);
    } catch (err) {
      fs.writeJson(pathConfig.userSettingsFile, appSettings);
    }
    return {
      mute: false,
      lang: appSettings.lang || 'en',
      devTools: appSettings.devTools || false,
      dockIcon: appSettings.dockIcon
    };
  },
  getItem(option) {
    const data = this._fromSettings();
    return data[option];
  },
  setItem(option, value) {
    const data = this._fromSettings();
    data[option] = value;
    fs.writeJson(pathConfig.userSettingsFile, data);

    if (option === 'dockIcon') {
      ipcRenderer.send('toggle-dock', value);
    }
    if (option === 'devTools') {
      ipcRenderer.send('toggle-devtools', value);
    }
  }
};
