import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import shortid from 'shortid';
import path from 'path';
import {
  __,
  always,
  applySpec,
  compose,
  lensProp,
  omit,
  prop,
  propOr,
  set
} from 'ramda';
import { pathConfig } from 'utils/';

const tmpUpdateStatus = path.join(
  pathConfig.tempDir,
  `kakapo-${shortid.generate()}`
);

const fromSettings = () => {
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

  return applySpec({
    mute: propOr(false, 'mute'),
    lang: propOr('en', 'lang'),
    devTools: propOr(false, 'devTools'),
    dockIcon: prop('dockIcon'),
    updateStatus: always(updateStatus)
  })(appSettings);
};

const getItem = prop(__, fromSettings());

const setItem = (option, value) => {
  const data = compose(set(lensProp(option), value))(fromSettings());
  fs.writeJson(pathConfig.userSettingsFile, omit('updateStatus', data));

  if (option === 'dockIcon') ipcRenderer.send('toggle-dock', value);
  if (option === 'devTools') ipcRenderer.send('toggle-devtools', value);
  if (option === 'updateStatus') fs.writeJson(tmpUpdateStatus, value);
};

export default {
  fromSettings,
  getItem,
  setItem
};
