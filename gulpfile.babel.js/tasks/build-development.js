import gulp from "gulp";
import gulpSequence from "gulp-sequence";

gulp.task("build:development", (cb) =>
  gulpSequence(
    "clean",
    "html",
    "images",
    "icons",
    "fonts",
    "sass:development",
    "webpack:development",
    ["electron", "watch"],
    cb)
);
