import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import shortid from 'shortid';
import path from 'path';
import {
  always,
  applySpec,
  compose,
  lensProp,
  omit,
  prop,
  propOr,
  set,
  merge
} from 'ramda';
import { pathConfig } from 'utils/';

const tmpFilePath = path.join(
  pathConfig.tempDir,
  `kakapo-${shortid.generate()}`
);
fs.ensureFileSync(tmpFilePath);

const fromSettings = () => {
  const opts = { throws: false };
  const appSettings = fs.readJsonSync(pathConfig.settingsFile, opts);
  const userSettings = fs.readJsonSync(pathConfig.userSettingsFile, opts);

  const settings = merge(appSettings, userSettings);

  const updateStatus = fs.readJsonSync(tmpFilePath, opts) || false;

  return applySpec({
    mute: propOr(false, 'mute'),
    lang: propOr('en', 'lang'),
    devTools: propOr(false, 'devTools'),
    dockIcon: prop('dockIcon'),
    updateStatus: always(updateStatus)
  })(settings);
};

const getItem = x => prop(x, fromSettings());

const setItem = (option, value) => {
  const data = compose(set(lensProp(option), value))(fromSettings());
  fs.outputJsonSync(pathConfig.userSettingsFile, omit(['updateStatus'], data));

  if (option === 'dockIcon') ipcRenderer.send('toggle-dock', value);
  if (option === 'devTools') ipcRenderer.send('toggle-devtools', value);
  if (option === 'updateStatus') fs.outputJsonSync(tmpFilePath, value);
};

export default {
  fromSettings,
  getItem,
  setItem
};
