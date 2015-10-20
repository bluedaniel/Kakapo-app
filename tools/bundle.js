import webpack from "webpack";
import task from "./lib/task";
import config from "./config";

export default task("bundle", async () => new Promise((resolve, reject) => {
  const bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      return reject(err);
    }

    console.log(stats.toString(config.stats));
    return resolve();
  }

  if (global.WATCH) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
}));
