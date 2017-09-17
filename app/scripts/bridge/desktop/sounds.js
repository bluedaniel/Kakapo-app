import semver from 'semver';
import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { compose, length, filter, prop, concat } from 'ramda';
import { pathConfig } from 'utils/';

const isPlaying = compose(length, filter(prop('playing')), JSON.parse);

const setVersion = () =>
  fs.writeFile(
    pathConfig.userInstallFile,
    JSON.stringify({ version: process.env.npm_package_version })
  );

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

  if (
    semver.lt(appDetails.version || '0.0.1', process.env.npm_package_version)
  ) {
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
  fs.writeFile(pathConfig.userSoundFile, data);
};

const removeFromDisk = sound => fs.unlinkSync(sound.file);

export default { setVersion, saveToStorage, removeFromDisk, initWithDefault };
