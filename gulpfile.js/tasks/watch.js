var gulp = require("gulp");
var sass = require("../config/sass");
var watch = require("gulp-watch");
var livereload = require("gulp-livereload");

gulp.task("watch", function() {
  livereload.listen();
  watch(sass.src, function() {
    gulp.start("sass:development");
  });
});
