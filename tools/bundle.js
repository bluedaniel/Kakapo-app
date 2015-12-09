import webpack from 'webpack';
import config from './webpack.config';

export default async function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(config);

    function onComplete(err, stats) {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(config.stats));

      // Upload stats.json to `http://webpack.github.io/analyse` for analysis.
      // fs.writeFile("stats.json", JSON.stringify(stats.toJson(), null, 4));

      resolve();
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}
