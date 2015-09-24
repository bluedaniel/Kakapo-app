var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var config = require("../config");

gulp.task("images", () =>
  gulp.src(config.sourceDirectory + "/images/**/*")
  .pipe(imagemin())
  .pipe(gulp.dest(config.distributionDirectory + "/images")));
