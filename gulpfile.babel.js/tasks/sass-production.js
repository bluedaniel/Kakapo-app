import gulp from "gulp";
import sass from "gulp-sass";
import config from "../config/sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-minify-css";

gulp.task("sass:production", ["css-to-scss"], () =>
  gulp.src(config.src)
  .pipe(sass().on("error", sass.logError))
  .pipe(autoprefixer())
  .pipe(minify())
  .pipe(gulp.dest(config.dest)));
