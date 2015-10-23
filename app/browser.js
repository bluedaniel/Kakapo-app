/* eslint id-length: 0 */
import app from "app";
import autoUpdater from "auto-updater";
import BrowserWindow from "browser-window";
import fs from "fs";
import ipc from "ipc";
import path from "path";
import Tray from "tray";
import proc from "child_process";

let appSettings = fs.readFileSync(path.join(app.getAppPath(), "data/settings.json"));
try {
  appSettings = fs.readFileSync(path.join(app.getPath("userData"), "user-data/settings.json"));
} catch (err) {
  // No settings file loaded
}
appSettings = JSON.parse(appSettings);

const iconIdle = path.join(app.getAppPath(), "images/tray-idle.png");
const iconActive = path.join(app.getAppPath(), "images/tray-active.png");

const updateCmd = function updateCmd(args, cb) {
  const updateExe = path.resolve(path.dirname(process.execPath), "..", "Update.exe");
  const child = proc.spawn(updateExe, args, {detached: true});
  child.on("close", cb);
};

if (process.platform === "win32") {
  const squirrelCommand = process.argv[1];
  const target = path.basename(process.execPath);
  switch (squirrelCommand) {
  case "--squirrel-install":
  case "--squirrel-updated":
    updateCmd(["--createShortcut", target], app.quit);
    break;
  case "--squirrel-uninstall":
    updateCmd(["--removeShortcut", target], app.quit);
    break;
  case "--squirrel-obsolete":
    app.quit();
    break;
  default:
  }
}

app.on("ready", () => {
  const appIcon = new Tray(iconIdle);
  const defaults = {
    frame: false,
    height: 600,
    resizable: false,
    width: 360
  };
  appIcon.window = new BrowserWindow(defaults);
  appIcon.window.loadUrl(path.join("file://", app.getAppPath(), "index.html"));

  if (process.platform === "darwin") {
    if (appSettings.dockIcon) {
      app.dock.show();
    } else {
      app.dock.hide();
    }
    ipc.on("toggle-dock", (event, arg) => arg ? app.dock.show() : app.dock.hide());
  }

  appIcon.on("clicked", function clicked(_e, bounds) {
    if (appIcon.window && appIcon.window.isVisible()) {
      if (appIcon.window) appIcon.window.hide();
    } else {
      appIcon.window.setPosition(...[
        bounds.x - 200 + (bounds.width / 2),
        process.platform === "darwin" ? bounds.y : bounds.y - 600
      ]);
      appIcon.window.show();
    }
  });

  ipc.on("reopen-window", () => appIcon.window.show());

  if (process.platform === "win32") {
    app.on("window-all-closed", () => app.quit());
  }

  ipc.on("update-icon", (event, arg) => appIcon.setImage(arg === "TrayActive" ? iconActive : iconIdle));

  ipc.on("app-quit", () => app.quit());

  appIcon.window.webContents.on("did-finish-load", () => {
    appIcon.window.setTitle("Kakapo");

    appIcon.setToolTip("Kakapo");
    if (process.env.NODE_ENV !== "development") {
      autoUpdater.setFeedUrl(`http://52.19.170.82:5000/update?version=${app.getVersion()}&platform=${process.platform}`);
    }
  });

  ipc.on("application:quit-install", () => autoUpdater.quitAndInstall());

  autoUpdater.on("update-downloaded", () =>
    appIcon.window.webContents.send("application:update-available"));
});
