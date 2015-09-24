import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../config/webpack-hot-server.config";

gulp.task("webpack:development", () => {
  new WebpackDevServer(webpack(config), config.devServer).listen(config.devServer.port, "localhost", function(err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "http://localhost:" + config.devServer.port + "/index.html");
  });
});
