import gulp from "gulp";
import rename from "gulp-rename";
import config from "../config";

var files = [
  "/skeleton/css/skeleton.css",
  "/animate.css/animate.css",
  "/normalize.css/normalize.css"
].map((file) => config.bowerDirectory + file);

gulp.task("css-to-scss", () =>
  gulp.src(files)
  .pipe(rename(function(path) {
    path.extname = ".scss";
  }))
  .pipe(gulp.dest(config.tempDirectory))
);
