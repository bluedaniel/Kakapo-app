import webpack from 'webpack';
import fs from 'fs-extra';
import zlib from 'zlib';
import { writeStats } from './helper';
import webpackConfigDev from './webpack.config.development';
import webpackConfigProd from './webpack.config.production';

export default async function bundle() {
  const config = global.WATCH ? webpackConfigDev : webpackConfigProd;

  return new Promise((resolve, reject) => {
    const bundler = webpack(config);

    const onComplete = (err, stats) => {
      if (err) return reject(err);

      writeStats(stats);

      if (!global.WATCH) {
        // Compress js with Gzip
        ['index.js', 'styles.css'].map(file =>
          fs
            .createReadStream(`./build/${file}`)
            .pipe(zlib.createGzip({ level: 9 }))
            .pipe(fs.createWriteStream(`./build/${file}.gz`))
        );
      }

      return resolve();
    };

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}
