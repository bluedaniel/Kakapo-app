import gulp from "gulp";
import electron from "electron-prebuilt";
import proc from "child_process";

gulp.task("electron", () => proc.spawn(electron, ["."]));
