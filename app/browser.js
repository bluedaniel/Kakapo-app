import {
  app,
  autoUpdater,
  BrowserWindow,
  dialog,
  ipcMain,
  Tray,
} from 'electron';
import fs from 'fs';
import path from 'path';
import proc from 'child_process';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

const appPath = app.getAppPath();
const userPath = app.getPath('userData');

let appSettings;
try {
  appSettings = fs.readFileSync(path.join(userPath, 'user-data/settings.json'));
} catch (err) {
  appSettings = fs.readFileSync(path.join(appPath, 'data/settings.json'));
}
appSettings = JSON.parse(appSettings);

const trayIcon = (str = 'idle') => path.join(appPath, `images/tray-${str}.png`);

const updateCmd = (args, cb) => {
  const updateExe = path.resolve(
    path.dirname(process.execPath),
    '..',
    'Update.exe'
  );
  const child = proc.spawn(updateExe, args, { detached: true });
  child.on('close', cb);
};

if (process.platform === 'win32') {
  const squirrelCommand = process.argv[1];
  const target = path.basename(process.execPath);
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      updateCmd(['--createShortcut', target], app.quit);
      break;
    case '--squirrel-uninstall':
      updateCmd(['--removeShortcut', target], app.quit);
      break;
    case '--squirrel-obsolete':
      app.quit();
      break;
    default:
  }
}

const toggleDock = (win, bool) => (bool ? win.dock.show() : win.dock.hide());

const toggleDevTools = (win, bool) =>
  bool ? win.openDevTools({ detach: true }) : win.closeDevTools();

app.on('ready', () => {
  const tray = new Tray(trayIcon());
  const defaults = {
    frame: false,
    height: 600,
    resizable: false,
    width: 400,
  };
  const win = new BrowserWindow(defaults);
  win.loadURL(path.join('file://', appPath, 'index.html'));

  // DevTools
  Promise.all([
    installExtension(REDUX_DEVTOOLS),
    installExtension(REACT_DEVELOPER_TOOLS),
  ]).catch(err => dialog.showErrorBox('Dev Tools Error', err));

  if (process.platform === 'darwin') {
    toggleDock(app, appSettings.dockIcon);
    ipcMain.on('toggle-dock', (event, arg) => toggleDock(app, arg));

    toggleDevTools(win, appSettings.devTools);
    ipcMain.on('toggle-devtools', (event, arg) => toggleDevTools(win, arg));
  }

  tray.on('click', () => (win.isVisible() ? win.hide() : win.show()));

  ipcMain.on('reopen-window', () => win.show());

  if (process.platform === 'win32') {
    app.on('window-all-closed', () => app.quit());
  }

  ipcMain.on('update-icon', (event, arg) =>
    tray.setImage(arg === 'TrayActive' ? trayIcon('active') : trayIcon())
  );

  ipcMain.on('app-quit', () => app.quit());

  win.webContents.on('did-finish-load', () => {
    win.setTitle('Kakapo');
    tray.setToolTip('Kakapo');

    if (process.env.NODE_ENV !== '"development"') {
      const url = 'http://52.19.170.82:5000';
      autoUpdater.setFeedURL(
        `${url}/update?version=${app.getVersion()}&platform=${process.platform}`
      );
    }
  });

  ipcMain.on('application:quit-install', () => autoUpdater.quitAndInstall());

  autoUpdater.on('update-downloaded', () =>
    win.webContents.send('application:update-available')
  );
});
