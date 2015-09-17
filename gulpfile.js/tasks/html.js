var gulp = require("gulp");
var rename = require("gulp-rename");
var config = require("../config");

gulp.task("html", function() {
  var file = process.env.NODE_ENV === "development" ? "/index-dev.html" : "/index.html";
  return gulp.src(config.sourceDirectory + file)
    .pipe(rename(function(path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest(config.distributionDirectory));
});
