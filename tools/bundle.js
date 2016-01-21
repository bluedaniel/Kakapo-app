import webpack from 'webpack';
import fs from 'fs-extra';
import zlib from 'zlib';
import config from './webpack.config';

export default async function bundle() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(config);

    function onComplete(err, stats) {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(config.stats));

      if (!global.WATCH) {
        // Upload stats.json to `http://webpack.github.io/analyse` for analysis.
        // Also you can analyze size with `https://github.com/robertknight/webpack-bundle-size-analyzer`:
        // `cat stats.json | analyze-bundle-size`
        fs.writeFile('stats.json', JSON.stringify(stats.toJson(), null, 4));

        // Compress js with Gzip
        [ 'index' ].map(file => fs.createReadStream(`./build/${file}.js`)
          .pipe(zlib.createGzip({ level: 9 }))
          .pipe(fs.createWriteStream(`./build/${file}.js.gz`)));
      }

      resolve();
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}
