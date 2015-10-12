import gulp from "gulp";
import gutil from "gulp-util";
import express from "express";
import path from "path";
import webpack from "webpack";
import config from "../config/webpack-hot-server.config";

var port = process.env.PORT || 3000;
var url = "http://localhost:" + port

gulp.task("webpack:development", () => {
  var app = express();
  var compiler = webpack(config);

  express()
    .use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }))
    .use(require("webpack-hot-middleware")(compiler))
    .use(express.static(path.resolve(__dirname, "../../dist")))
    .listen(port, () => gutil.log("Server started on " + gutil.colors.green(url)));
});
