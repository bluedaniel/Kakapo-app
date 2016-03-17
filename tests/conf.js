import { argv } from 'yargs';
import webpackConfig from '../tools/webpack.config.test';
import path from 'path';

module.exports = (config) => {
  config.set({
    frameworks: [ 'mocha', 'chai' ],
    reporters: [ 'coverage', 'mocha' ],
    browsers: [ 'PhantomJS' ],
    singleRun: !argv.watch,
    files: [
      './tests/test-bundler.js'
    ],
    preprocessors: {
      ['./tests/test-bundler.js']: [ 'webpack', 'sourcemap' ]
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
