var gulp = require("gulp");
var winInstaller = require("electron-windows-installer");

gulp.task("windows-installer", function(done) {
  winInstaller({
    exe: "Kakapo.exe",
    appDirectory: "./release/win32-x64/Kakapo-win32-x64",
    outputDirectory: "./release/win32-x64",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Information_icon.svg"
  }).then(done).catch(done);
});
