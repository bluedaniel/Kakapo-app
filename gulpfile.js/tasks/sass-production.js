var gulp = require("gulp");
var sass = require("gulp-sass");
var config = require("../config/sass");
var autoprefixer = require("gulp-autoprefixer");
var minify = require("gulp-minify-css");

gulp.task("sass:production", ["css-to-scss"], function() {
  return gulp.src(config.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest(config.dest));
});
