import { argv } from 'yargs';
import webpackConfig from '../tools/webpack.config.test';
import path from 'path';

module.exports = (config) => {
  config.set({
    frameworks: [ 'mocha', 'chai' ],
    reporters: [ 'coverage', 'mocha', 'coveralls' ],
    browsers: [ 'PhantomJS' ],
    singleRun: !argv.watch,
    files: [
      'test/test-bundler.js'
    ],
    preprocessors: {
      ['test/test-bundler.js']: [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackConfig,
    webpackServer: { noInfo: true },
    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' }
      ]
    }
  });
};
