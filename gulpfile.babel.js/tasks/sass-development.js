import gulp from "gulp";
import sass from "gulp-sass";
import config from "../config/sass";
import autoprefixer from "gulp-autoprefixer";
import livereload from "gulp-livereload";
import sourcemaps from "gulp-sourcemaps";

gulp.task("sass:development", ["css-to-scss"], () =>
  gulp.src(config.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on("error", sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.dest))
  .pipe(livereload()));
