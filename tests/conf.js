import webpackConfig from './webpack.test.babel';
import path from 'path';

module.exports = (config) => {
  config.set({
    frameworks: [ 'mocha' ],
    reporters: [ 'coverage', 'mocha' ],
    browsers: [ 'PhantomJS' ],
    autoWatch: false,
    singleRun: true,

    files: [
      './tests/test-bundler.js'
    ],

    preprocessors: {
      ['./tests/test-bundler.js']: [ 'webpack', 'sourcemap' ]
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' }
      ]
    }
  });
};
