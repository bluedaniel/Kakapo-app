import fs from 'fs-extra';
import path from 'path';
import { remote } from 'electron';

let exportData;

if (__DESKTOP__) {
  const app = remote.app;

  // Setup directories
  [ 'user-sounds', 'user-data' ].forEach(_d => fs.ensureDir(path.join(app.getPath('userData'), _d)));

  exportData = {
    // Default json objects & dirs
    gradientFile: path.join(app.getAppPath(), 'data/gradients.json'),
    settingsFile: path.join(app.getAppPath(), 'data/settings.json'),
    soundFile: path.join(app.getAppPath(), 'data/sounds.json'),
    soundDir: path.join(app.getAppPath(), 'sounds'),

    // User data & dirs
    userSoundDir: path.join(app.getPath('userData'), 'user-sounds'),
    userSettingsFile: path.join(app.getPath('userData'), 'user-data/settings.json'),
    userSoundFile: path.join(app.getPath('userData'), 'user-data/sounds.json'),
    userThemeFile: path.join(app.getPath('userData'), 'user-data/theme.json'),
    userInstallFile: path.join(app.getPath('userData'), 'user-data/app-details.json')
  };
}

export default exportData;
