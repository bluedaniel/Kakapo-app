import { argv } from 'yargs';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proc from 'child_process';
import electron from 'electron-prebuilt';
import webpackConfig from './webpack.config';
import run from './run';

process.env.NODE_ENV = JSON.stringify('development');

export default async function start() {
  await run(require('./build'));
  await run(require('./serve'));

  const bundler = webpack(webpackConfig);

  if (argv.platform === 'desktop') {
    proc
      .spawn(electron, [ 'build' ])
      .stdout.on('data', data => console.log(data.toString()));
  }

  browserSync({
    open: argv.platform === 'web',
    proxy: {
      target: 'localhost:5000',
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: webpackConfig.stats
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      'build/favicons/**/*.*',
      'build/icons/**/*.*',
      'build/images/**/*.*'
    ]
  });
}
