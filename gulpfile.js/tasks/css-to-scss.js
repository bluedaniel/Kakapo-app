var gulp = require("gulp");
var rename = require("gulp-rename");
var config = require("../config");

var files = [
  "/skeleton/css/skeleton.css",
  "/animate.css/animate.css",
  "/normalize.css/normalize.css"
].map(function(file) {
  return config.bowerDirectory + file;
});

gulp.task("css-to-scss", function() {
  return gulp.src(files)
    .pipe(rename(function(path) {
      path.extname = ".scss";
    }))
    .pipe(gulp.dest(config.tempDirectory));
});
