import gulp from "gulp";
import gulpSequence from "gulp-sequence";

gulp.task("build:production", (cb) =>
  gulpSequence(
    "set-prod-node-env",
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

gulp.task("set-prod-node-env", function() {
  return process.env.NODE_ENV = "production";
});
