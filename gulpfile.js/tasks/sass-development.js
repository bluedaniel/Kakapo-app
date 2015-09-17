var gulp = require("gulp");
var sass = require("gulp-sass");
var config = require("../config/sass");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass:development", ["css-to-scss"], function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(livereload());
});
