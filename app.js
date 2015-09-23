// Kakapo - A background noise generator
var app = require("app");
var path = require("path");
var fs = require("fs");
var ipc = require("ipc");

require("crash-reporter").start();

var Tray = require("tray");
var BrowserWindow = require("browser-window");

var settings = JSON.parse(fs.readFileSync(path.join(__dirname, "app", "data", "settings.json")));
var file = path.join("file://", __dirname, "app", (process.env.HOT ? "index-dev" : "index") + ".html");
var iconIdle = path.join(__dirname, "app", "images", "tray-idle.png");
var iconActive = path.join(__dirname, "app", "images", "tray-active.png");

app.on("ready", function() {
  var appIcon = new Tray(iconIdle);
  initWindow();

  if (process.platform === "darwin") {
    applySettings();
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

  function showWindow(bounds) {
    var options = {
      x: bounds.x - 200 + (bounds.width / 2),
      y: bounds.y,
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

  appIcon.window.setTitle("Kakapo");
  appIcon.setToolTip("Kakapo");
});
