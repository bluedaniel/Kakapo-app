import gulp from "gulp";
import os from "os";
import winInstaller from "electron-windows-installer";
import config from "../config";
import gutil from "gulp-util";

gulp.task("installer-win", function(done) {
  if (os.platform() === "win32") {
    winInstaller({
      exe: "Kakapo.exe",
      appDirectory: config.tempDirectory + "/win32/Kakapo-win32-x64",
      outputDirectory: config.releaseDirectory + "/win32",
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Information_icon.svg"
    }).then(done).catch(done);
  } else {
    throw new gutil.PluginError("installer-win", "Gulp task `installer-win` can only be run on a Windows machine!");
  }
});
