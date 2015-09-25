import gulp from "gulp";
import rename from "gulp-rename";
import config from "../config";

gulp.task("html", () => {
  var file = process.env.NODE_ENV === "development" ? "/index-dev.html" : "/index.html";
  return gulp.src(config.sourceDirectory + file)
    .pipe(rename(path => path.basename = "index"))
    .pipe(gulp.dest(config.distributionDirectory));
});
