import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import shortid from 'shortid';
import path from 'path';
import { compose, set, lensProp, omit } from 'ramda';
import { pathConfig } from 'utils/';

const tmpUpdateStatus = path.join(
  pathConfig.tempDir,
  `kakapo-${shortid.generate()}`
);

export default {
  _fromSettings() {
    let appSettings = fs.readJsonSync(pathConfig.settingsFile, {
      throws: false
    });
    try {
      appSettings = fs.readJsonSync(pathConfig.userSettingsFile);
    } catch (err) {
      fs.writeJson(pathConfig.userSettingsFile, appSettings);
    }

    let updateStatus = false;
    try {
      updateStatus = fs.readJsonSync(tmpUpdateStatus, { throws: false });
    } catch (err) {
      fs.writeJson(tmpUpdateStatus, updateStatus);
    }

    return {
      mute: appSettings.mute || false,
      lang: appSettings.lang || 'en',
      devTools: appSettings.devTools || false,
      dockIcon: appSettings.dockIcon,
      updateStatus
    };
  },
  getItem(option) {
    const data = this._fromSettings();
    return data[option];
  },
  setItem(option, value) {
    const data = compose(set(lensProp(option), value))(this._fromSettings());
    fs.writeJson(pathConfig.userSettingsFile, omit('updateStatus', data));

    if (option === 'dockIcon') ipcRenderer.send('toggle-dock', value);
    if (option === 'devTools') ipcRenderer.send('toggle-devtools', value);
    if (option === 'updateStatus') fs.writeJson(tmpUpdateStatus, value);
  }
};
