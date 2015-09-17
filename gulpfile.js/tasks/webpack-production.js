var gulp = require("gulp");
var logger = require("../lib/compileLogger");
var webpack = require("webpack");
var config = require("../config/webpack-production.config");

gulp.task("webpack:production", function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats);
    callback();
  });
});
