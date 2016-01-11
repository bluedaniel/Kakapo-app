import { argv } from 'yargs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proc from 'child_process';
import electron from 'electron-prebuilt';
import config from './webpack.config';
import open from 'open';

export default async function serve() {
  return new Promise((resolve, reject) => {
    const server = global.server = express();
    const bundler = webpack(config);

    let devMiddleware = webpackDevMiddleware(bundler, {
      publicPath: config.output.publicPath,
      stats: config.stats
    });

    server.set('port', (process.env.PORT || 3000));
    server.use(express.static(path.resolve(__dirname, '../build')));

    console.log('Webpack bundle is being built ...');
    server.use(devMiddleware);
    server.use(webpackHotMiddleware(bundler));

    server.listen(server.get('port'), () =>
      resolve(console.log('The server is running at http://localhost:' + server.get('port'))));

    server.once('error', err => reject(err));

    // Next step of the build process
    let webpackComplete = () => open('http://localhost:' + server.get('port'));

    if (argv.platform === 'desktop') {
      // Start electron app
      webpackComplete = () => proc.spawn(electron, [ 'build' ]).stdout.on('data', data => console.log(data.toString()));
    }

    devMiddleware.waitUntilValid(webpackComplete);

    process.on('exit', () => server.kill('SIGTERM'));
    return server;
  });
}
