var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");

gulp.task("build:production", function(cb) {
  gulpSequence(
    "clean",
    "html",
    "images",
    "icons",
    "fonts",
    "sass:production",
    "webpack:production",
    cb);
});
