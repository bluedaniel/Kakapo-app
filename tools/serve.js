import { argv } from 'yargs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proc from 'child_process';
import electron from 'electron';
import open from 'open';
import config from './webpack.config.development';

export default async function serve() {
  return new Promise((resolve, reject) => {
    const server = express();
    global.server = server;
    const bundler = webpack(config);

    const devMiddleware = webpackDevMiddleware(bundler, {
      publicPath: config.output.publicPath,
      stats: config.stats
    });

    server.set('port', process.env.PORT || 3000);
    server.use(express.static(path.resolve(__dirname, '../build')));

    console.log('Webpack bundle is being built ...');
    server.use(devMiddleware);
    server.use(webpackHotMiddleware(bundler));

    server.listen(server.get('port'), () =>
      resolve(
        console.log(
          `The server is running at http://localhost:${server.get('port')}`
        )
      )
    );

    server.once('error', err => reject(err));

    // Next step of the build process
    let webpackBuild = () => open(`http://localhost:${server.get('port')}`);

    if (argv.platform === 'desktop') {
      // Start electron app
      webpackBuild = () =>
        proc
          .spawn(electron, ['build'])
          .stdout.on('data', data => console.log(data.toString()));
    }

    devMiddleware.waitUntilValid(webpackBuild);

    process.on('exit', () => {
      console.log(`Shutting down the server`);
      server.close();
    });
    return server;
  });
}
