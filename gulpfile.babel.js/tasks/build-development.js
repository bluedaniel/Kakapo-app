import gulp from "gulp";
import gulpSequence from "gulp-sequence";

gulp.task("build:development", (cb) =>
  gulpSequence(
    "set-dev-node-env",
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

gulp.task("set-dev-node-env", function() {
  return process.env.NODE_ENV = "development";
});
