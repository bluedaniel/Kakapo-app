import semver from 'semver';
import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { compose, length, filter, prop, concat } from 'ramda';
import { pathConfig } from 'utils/';
import packageJson from '../../../../package.json';

const isPlaying = compose(length, filter(prop('playing')), JSON.parse);

export default {
  setVersion() {
    fs.writeFile(
      pathConfig.userInstallFile,
      JSON.stringify({ version: packageJson.version })
    );
  },
  initWithDefault(defaultSounds) {
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
      this.setVersion();
      return defaultSounds;
    }

    try {
      appDetails = fs.readJsonSync(pathConfig.userInstallFile, {
        throws: false
      });
    } catch (e) {
      appDetails = {};
    }

    if (semver.lt(appDetails.version || '0.0.1', packageJson.version)) {
      this.setVersion();
      return compose(concat(defaultSounds), filter(_s => _s.source !== 'file'))(
        initialState
      );
    }

    return initialState;
  },
  saveToStorage(data) {
    const trayIcon = isPlaying(data);
    ipcRenderer.send('update-icon', trayIcon ? 'TrayActive' : 'TrayIdle');
    fs.writeFile(pathConfig.userSoundFile, data);
  },
  removeFromDisk(sound) {
    fs.unlinkSync(sound.file);
  }
};
