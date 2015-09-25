import gulp from "gulp";
import gulpSequence from "gulp-sequence";
import os from "os";
import winInstaller from "electron-windows-installer";
import rcedit from "rcedit";
import gutil from "gulp-util";
import packagejson from "../../package.json";
import config from "../config";

gulp.task("installer-win", cb =>
  gulpSequence(
    "win-rcedit",
    "win-setupexe",
    cb)
);

var rceditOpts = {
  icon: config.sourceDirectory + "/images/app.ico",
  "file-version": packagejson.version,
  "product-version": packagejson.version,
  "version-string": {
    "CompanyName": "Kakapo",
    "ProductVersion": packagejson.version,
    "ProductName": "Kakapo",
    "FileDescription": "Kakapo",
    "InternalName": "Kakapo.exe",
    "OriginalFilename": "Kakapo.exe"
  }
};

gulp.task("win-rcedit", cb => rcedit(config.tempDirectory + "/win32/Kakapo-win32-x64/Kakapo.exe", rceditOpts, cb));

gulp.task("win-setupexe", function(done) {
  if (os.platform() === "win32") {
    winInstaller({
      appDirectory: config.tempDirectory + "/win32/Kakapo-win32-x64",
      outputDirectory: config.releaseDirectory + "/win32",
      authors: "Daniel Levitt",
      loadingGif: config.sourceDirectory + "/images/loading.gif",
      setupIcon: config.sourceDirectory + "/images/app.ico",
      iconUrl: "https://raw.githubusercontent.com/bluedaniel/Kakapo-app/master/app/app.ico",
      description: "Kakapo",
      title: "Kakapo",
      exe: "Kakapo.exe",
      version: packagejson.version
    }).then(done).catch(done);
  } else {
    throw new gutil.PluginError("installer-win", "Gulp task `installer-win` can only be run on a Windows machine!");
  }
});
