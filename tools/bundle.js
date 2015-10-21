import webpack from "webpack";
import fs from "fs-extra";
import task from "./lib/task";
import config from "./config";

export default task("bundle", async () => new Promise((resolve, reject) => {
  const bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      return reject(err);
    }

    console.log(stats.toString(config.stats));

    // Upload stats.json to `http://webpack.github.io/analyse` for analysis.
    fs.writeFile("stats.json", JSON.stringify(stats.toJson(), null, 4));

    return resolve();
  }

  if (global.HOT) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
}));
