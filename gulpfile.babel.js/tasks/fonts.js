import gulp from "gulp";
import config from "../config";

gulp.task("fonts", () =>
  gulp.src(config.sourceDirectory + "/fonts/**/*")
  .pipe(gulp.dest(config.distributionDirectory + "/fonts")));
