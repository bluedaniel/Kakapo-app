import gulp from "gulp";
import sass from "../config/sass";
import watch from "gulp-watch";
import livereload from "gulp-livereload";

gulp.task("watch", () => {
  livereload.listen();
  watch(sass.src, () => gulp.start("sass:development"));
});
