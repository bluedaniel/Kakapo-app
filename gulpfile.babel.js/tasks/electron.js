import gulp from "gulp";
import electron from "electron-prebuilt";
import proc from "child_process";

process.env.NODE_ENV = "development";

gulp.task("electron", () => proc.spawn(electron, ["."]));
