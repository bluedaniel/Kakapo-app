import semver from 'semver';
import fs from 'fs-extra';
import { ipcRenderer } from 'electron';
import { Map } from 'immutable';
import { pathConfig } from 'utils/';
import packageJson from '../../../../package.json';

const latestVersion = packageJson.config.soundsVersion;

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

    initialState = new Map(initialState);

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
  saveToStorage(json) {
    const trayIcon = new Map(JSON.parse(json)).filter(_s => _s.playing).size;
    ipcRenderer.send('update-icon', trayIcon ? 'TrayActive' : 'TrayIdle');
    fs.writeFile(pathConfig.userSoundFile, json);
  },
  removeFromDisk(sound) {
    fs.unlinkSync(sound.file);
  }
};
