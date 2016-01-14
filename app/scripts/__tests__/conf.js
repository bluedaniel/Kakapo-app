import { argv } from 'yargs';
import webpackConfig from '../../../tools/webpack.config';

const webpackTestConfig = {
  externals: { ...webpackConfig.externals, ...{
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  } },
  module: { ...webpackConfig.module, ...{
    postLoaders: [ {
      test: /\.js$/,
      exclude: /(__tests__|node_modules)/,
      loader: 'istanbul-instrumenter'
    } ]
  } },
  resolve: { ...webpackConfig.resolve, ...{
    alias: { ...webpackConfig.resolve.alias, ...{
      sinon: 'sinon/pkg/sinon'
    } }
  } }
};

export default (config) => {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: !argv.watch,
    frameworks: [ 'mocha', 'chai' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './app/scripts/__tests__/index.js'
    ],
    preprocessors: {
      './app/scripts/__tests__/index.js': [ 'webpack', 'sourcemap' ]
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader'
    ],
    reporters: [ 'spec' ],
    webpack: { ...webpackConfig, ...webpackTestConfig },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
