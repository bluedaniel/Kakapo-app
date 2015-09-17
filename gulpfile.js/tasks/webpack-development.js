var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("../config/webpack-hot-server.config");

gulp.task("webpack:development", function() {
  new WebpackDevServer(webpack(config), config.devServer).listen(config.devServer.port, "localhost", function(err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:" + config.devServer.port + "/index.html");
  });
});
