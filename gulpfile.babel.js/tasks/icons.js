import gulp from "gulp";
import imagemin from "gulp-imagemin";
import config from "../config";

gulp.task("icons", () =>
  gulp.src(config.sourceDirectory + "/icons/**/*")
  .pipe(imagemin())
  .pipe(gulp.dest(config.distributionDirectory + "/icons")));
