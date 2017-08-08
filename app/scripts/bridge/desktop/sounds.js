import semver from 'semver';
import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { compose, length, filter, prop } from 'ramda';
import { pathConfig } from 'utils/';
import packageJson from '../../../../package.json';

const latestVersion = packageJson.config.soundsVersion;

const isPlaying = compose(length, filter(prop('playing')), JSON.parse);

export default {
  setVersion() {
    fs.writeFile(
      pathConfig.userInstallFile,
      JSON.stringify({ version: latestVersion })
    );
  },
  initWithDefault(defaultSounds) {
    let initialState;
    let appDetails;

    try {
      initialState = fs.readJsonSync(
        pathConfig.userSoundFile,
        { throws: false },
        (err, data) => {
          if (err) return [];
          return data;
        }
      );
    } catch (e) {
      initialState = [];
    }

    if (!initialState.size) {
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
      return initialState
        .filterNot(_s => _s.source === 'file')
        .toArray()
        .concat(defaultSounds);
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
