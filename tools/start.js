import browserSync from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import electron from "electron-prebuilt";
import proc from "child_process";
import task from "./lib/task";

process.env.NODE_ENV = "development";
global.HOT = true;

const webpackConfig = require("./config");
const bundler = webpack(webpackConfig);

export default task("start", async () => {
  await require("./clean")();
  await require("./copy")();
  await require("./serve")();

  proc
    .spawn(electron, ["build"])
    .stdout.on("data", data => console.log(data.toString()));

  browserSync({
    open: false,
    proxy: {
      target: "localhost:5000",
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: webpackConfig.stats
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      "build/icons/**/*.*",
      "build/images/**/*.*"
    ]
  });
});
