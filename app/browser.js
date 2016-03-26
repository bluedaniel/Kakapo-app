import app from 'app';
import fs from 'fs';
import { ipcMain, BrowserWindow, autoUpdater } from 'electron';
import path from 'path';
import Tray from 'tray';
import proc from 'child_process';

let appSettings;
try {
  appSettings = fs.readFileSync(path.join(app.getPath('userData'), 'user-data/settings.json'));
} catch (err) {
  appSettings = fs.readFileSync(path.join(app.getAppPath(), 'data/settings.json'));
}
appSettings = JSON.parse(appSettings);

const iconIdle = path.join(app.getAppPath(), 'images/desktop/tray-idle.png');
const iconActive = path.join(app.getAppPath(), 'images/desktop/tray-active.png');

const updateCmd = function updateCmd(args, cb) {
  const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
  const child = proc.spawn(updateExe, args, { detached: true });
  child.on('close', cb);
};

if (process.platform === 'win32') {
  const squirrelCommand = process.argv[1];
  const target = path.basename(process.execPath);
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      updateCmd([ '--createShortcut', target ], app.quit);
      break;
    case '--squirrel-uninstall':
      updateCmd([ '--removeShortcut', target ], app.quit);
      break;
    case '--squirrel-obsolete':
      app.quit();
      break;
    default:
  }
}

function toggleDock(app, bool) {
  if (bool) return app.dock.show();
  return app.dock.hide();
}

function toggleDevTools(app, bool) {
  if (bool) return app.openDevTools({ detach: true });
  return app.closeDevTools();
}

app.on('ready', () => {
  const appIcon = new Tray(iconIdle);
  const defaults = {
    frame: false,
    height: 600,
    resizable: false,
    width: 400
  };
  appIcon.window = new BrowserWindow(defaults);
  appIcon.window.loadUrl(path.join('file://', app.getAppPath(), 'index.html'));

  appIcon.window.webContents.on('new-window', (event, url, frameName, disposition, opts) => {
    opts.frame = true;
  });

  if (process.platform === 'darwin') {
    toggleDock(app, appSettings.dockIcon);
    ipcMain.on('toggle-dock', (event, arg) => toggleDock(app, arg));

    toggleDevTools(appIcon.window, appSettings.devTools);
    ipcMain.on('toggle-devtools', (event, arg) => toggleDevTools(appIcon.window, arg));
  }

  appIcon.on('clicked', (_e, bounds) => {
    if (appIcon.window && appIcon.window.isVisible()) {
      if (appIcon.window) appIcon.window.hide();
    } else {
      appIcon.window.setPosition(...[
        bounds.x - 200 + (bounds.width / 2),
        process.platform === 'darwin' ? bounds.y : bounds.y - 600
      ]);
      appIcon.window.show();
    }
  });

  ipcMain.on('reopen-window', () => appIcon.window.show());

  if (process.platform === 'win32') {
    app.on('window-all-closed', () => app.quit());
  }

  ipcMain.on('update-icon', (event, arg) =>
    appIcon.setImage(arg === 'TrayActive' ? iconActive : iconIdle));

  ipcMain.on('app-quit', () => app.quit());

  appIcon.window.webContents.on('did-finish-load', () => {
    appIcon.window.setTitle('Kakapo');

    appIcon.setToolTip('Kakapo');
    if (process.env.NODE_ENV !== '"development"') {
      autoUpdater.setFeedUrl(`http://52.19.170.82:5000/update?version=${app.getVersion()}&platform=${process.platform}`);
    }
  });

  ipcMain.on('application:quit-install', () => autoUpdater.quitAndInstall());

  autoUpdater.on('update-downloaded', () =>
    appIcon.window.webContents.send('application:update-available'));
});
