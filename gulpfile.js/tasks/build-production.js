var gulp = require("gulp");
var gulpSequence = require("gulp-sequence");

gulp.task("build:production", function(cb) {
  gulpSequence(
    "clean",
    "html",
    "images",
    "icons",
    "favicons",
    "sass:production",
    "webpack:production",
    ["s3-app", "s3-data"],
    "s3-app-gzip",
    cb);
});
