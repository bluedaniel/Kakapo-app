var gulp = require("gulp");
var del = require("del");
var config = require("../config");

gulp.task("clean", function (cb) {
  return del([
    config.tempDirectory,
    config.distributionDirectory
  ], cb);
});
