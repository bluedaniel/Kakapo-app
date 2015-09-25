// Kakapo - A background noise generator
var app = require("app");
var autoUpdater = require("auto-updater");
var BrowserWindow = require("browser-window");
var fs = require("fs");
var ipc = require("ipc");
var path = require("path");
var Tray = require("tray");

var settings = JSON.parse(fs.readFileSync(path.join(__dirname, "app", "data", "settings.json")));
var file = path.join("file://", __dirname, "app", (process.env.NODE_ENV === "development" ? "index-dev" : "index") + ".html");
var iconIdle = path.join(__dirname, "app", "images", "tray-idle.png");
var iconActive = path.join(__dirname, "app", "images", "tray-active.png");

app.on("ready", function() {
  var appIcon = new Tray(iconIdle);
  initWindow();

  if (process.platform === "darwin") {
    applySettings();
  }

  function initWindow() {
    var defaults = {
      frame: false,
      height: 600,
      resizable: false,
      width: 360
    };

    appIcon.window = new BrowserWindow(defaults);
    appIcon.window.loadUrl(file);
  }

  appIcon.on("clicked", function clicked(e, bounds) {
    if (appIcon.window && appIcon.window.isVisible()) {
      if (appIcon.window) {
        appIcon.window.hide();
      }
    } else {
      showWindow(bounds);
    }
  });

  function showWindow(bounds) {
    var options = {
      x: bounds.x - 200 + (bounds.width / 2),
      y: process.platform === "darwin" ? bounds.y : bounds.y - 600,
      index: file
    };
    appIcon.window.setPosition(options.x, options.y);
    appIcon.window.show();
  }

  ipc.on("reopen-window", function() {
    appIcon.window.show();
  });

  ipc.on("update-icon", function(event, arg) {
    if (arg === "TrayActive") {
      appIcon.setImage(iconActive);
    } else {
      appIcon.setImage(iconIdle);
    }
  });

  ipc.on("app-quit", function() {
    app.quit();
  });

  function applySettings() {
    settings.dockIcon ? app.dock.show() : app.dock.hide();

    ipc.on("toggle-dock", function(event, arg) {
      arg ? app.dock.show() : app.dock.hide();
    });
  }

  appIcon.window.webContents.on("did-finish-load", function() {
    appIcon.window.setTitle("Kakapo");
    appIcon.setToolTip("Kakapo");

    if (process.env.NODE_ENV !== "development") {
      autoUpdater.setFeedUrl("");
    }
  });

  ipc.on("application:quit-install", function () {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("checking-for-update", function () {
    console.log("Checking for update...");
  });

  autoUpdater.on("update-available", function () {
    console.log("Update available.");
  });

  autoUpdater.on("update-not-available", function () {
    console.log("Update not available.");
  });

  autoUpdater.on("update-downloaded", function (e, releaseNotes, releaseName, releaseDate, updateURL) {
    console.log("Update downloaded.");
    console.log(releaseNotes, releaseName, releaseDate, updateURL);
    appIcon.window.webContents.send("application:update-available");
  });

  autoUpdater.on("error", function (e, error) {
    console.log("An error occured while checking for updates.");
    console.log(error);
  });
});
