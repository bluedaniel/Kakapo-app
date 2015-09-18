var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var config = require("../config");

gulp.task("icons", function() {
  return gulp.src(config.sourceDirectory + "/icons/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(config.distributionDirectory + "/icons"));
});
