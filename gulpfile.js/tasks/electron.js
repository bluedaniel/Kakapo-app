var gulp = require("gulp");
var electron = require("electron-prebuilt");
var proc = require("child_process");

process.env.NODE_ENV = "development";

gulp.task("electron", function() {
  proc.spawn(electron, ["."]);
});
