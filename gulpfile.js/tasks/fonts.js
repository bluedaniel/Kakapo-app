var gulp = require("gulp");
var config = require("../config");

gulp.task("fonts", function() {
  return gulp.src(config.sourceDirectory + "/fonts/**/*")
    .pipe(gulp.dest(config.distributionDirectory + "/fonts"));
});
