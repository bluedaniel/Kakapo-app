import gulp from "gulp";
import logger from "../lib/compileLogger";
import webpack from "webpack";
import config from "../config/webpack-production.config";

gulp.task("webpack:production", (callback) =>
  webpack(config, (err, stats) => {
    logger(err, stats);
    callback();
  }));
