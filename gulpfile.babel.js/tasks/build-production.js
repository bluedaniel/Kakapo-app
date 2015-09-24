import gulp from "gulp";
import gulpSequence from "gulp-sequence";

gulp.task("build:production", (cb) =>
  gulpSequence(
    "clean",
    "html",
    "images",
    "icons",
    "fonts",
    "sass:production",
    "webpack:production",
    "package",
    cb)
);
