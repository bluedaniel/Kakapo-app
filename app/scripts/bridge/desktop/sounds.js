import semver from 'semver';
import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { compose, length, filter, prop, concat } from 'ramda';
import appConfig from 'config/';
import { pathConfig } from 'utils/';

const isPlaying = compose(length, filter(prop('playing')));

const setVersion = () =>
  fs.outputJsonSync(pathConfig.userInstallFile, {
    version: appConfig.appVersion
  });

const initWithDefault = defaultSounds => {
  let initialState;
  let appDetails;

  try {
    initialState = fs.readJsonSync(pathConfig.userSoundFile, {
      throws: false
    });
  } catch (e) {
    initialState = [];
  }

  if (!length(initialState)) {
    setVersion();
    return defaultSounds;
  }

  try {
    appDetails = fs.readJsonSync(pathConfig.userInstallFile, {
      throws: false
    });
  } catch (e) {
    appDetails = {};
  }

  if (semver.lt(appDetails.version || '0.0.1', appConfig.appVersion)) {
    setVersion();
    return compose(concat(defaultSounds), filter(_s => _s.source !== 'file'))(
      initialState
    );
  }

  return initialState;
};

const saveToStorage = data => {
  const trayIcon = isPlaying(data);
  ipcRenderer.send('update-icon', trayIcon ? 'TrayActive' : 'TrayIdle');
  fs.outputJsonSync(pathConfig.userSoundFile, data);
};

const removeFromDisk = sound => fs.unlinkSync(sound.file);

export default { setVersion, saveToStorage, removeFromDisk, initWithDefault };
