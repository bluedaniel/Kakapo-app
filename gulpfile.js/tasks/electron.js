var gulp = require("gulp");
var electron = require("electron-prebuilt");
var proc = require("child_process");

gulp.task("electron", function() {
  proc.spawn(electron, [process.env.PWD]);
});
