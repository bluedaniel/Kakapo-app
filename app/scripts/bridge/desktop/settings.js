import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import shortid from 'shortid';
import path from 'path';
import {
  always,
  applySpec,
  lensProp,
  merge,
  omit,
  pipe,
  prop,
  propOr,
  set,
} from 'ramda';
import { pathConfig } from 'utils/';

const tmpFile = path.join(pathConfig.tempDir, `kakapo-${shortid.generate()}`);

fs.ensureFileSync(pathConfig.settingsFile);
fs.ensureFileSync(pathConfig.userSettingsFile);
fs.ensureFileSync(tmpFile);

const fromSettings = () => {
  const opts = { throws: false };
  const appSettings = fs.readJsonSync(pathConfig.settingsFile, opts) || {};
  const userSettings = fs.readJsonSync(pathConfig.userSettingsFile, opts) || {};
  const updateStatus = fs.readJsonSync(tmpFile, opts) || false;

  const settings = merge(appSettings, userSettings);

  return applySpec({
    mute: propOr(false, 'mute'),
    lang: propOr('en', 'lang'),
    devTools: propOr(false, 'devTools'),
    dockIcon: prop('dockIcon'),
    updateStatus: always(updateStatus),
  })(settings);
};

const getItem = x => prop(x, fromSettings());

const setItem = (option, value) => {
  const data = pipe(set(lensProp(option), value))(fromSettings());
  fs.outputJsonSync(pathConfig.userSettingsFile, omit(['updateStatus'], data));

  if (option === 'dockIcon') ipcRenderer.send('toggle-dock', value);
  if (option === 'devTools') ipcRenderer.send('toggle-devtools', value);
  if (option === 'updateStatus') fs.outputJsonSync(tmpFile, value);
};

export default {
  fromSettings,
  getItem,
  setItem,
};
