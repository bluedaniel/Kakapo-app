var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");

gulp.task("build:development", function(cb) {
  gulpSequence(
    "clean",
    "html",
    "images",
    "icons",
    "favicons",
    "sass:development",
    "webpack:development",
    "watch",
    cb);
});
