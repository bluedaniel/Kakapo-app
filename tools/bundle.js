import webpack from 'webpack';
import fs from 'fs-extra';
import webpackConfigDev from './webpack.config.development';
import webpackConfigProd from './webpack.config.production';

export default async function bundle() {
  const config = global.WATCH ? webpackConfigDev : webpackConfigProd;

  return new Promise((resolve, reject) => {
    const bundler = webpack(config);

    const onComplete = (err, stats) => {
      if (err) return reject(err);
      fs.writeFile('stats.json', JSON.stringify(stats.toJson(), null, 4));
      return resolve();
    };

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}
