import { argv } from 'yargs';
import webpackConfig from '../../../tools/webpack.config';

const preLoaders = [ ...webpackConfig.module.loaders ];
const preprocessors = [ 'webpack', 'sourcemap' ];

if (!argv.watch) {
  preprocessors.push('coverage');
  preLoaders.push({
    test: /\.(js|jsx)?$/,
    include: /app\/scripts/,
    loader: 'isparta',
    exclude: /(__tests__|node_modules)/
  });
}

const webpackTestConfig = {
  externals: { ...webpackConfig.externals, ...{
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  } },
  devTool: 'inline-source-map',
  module: {
    preLoaders,
    noParse: webpackConfig.module.noParse
  },
  resolve: { ...webpackConfig.resolve, ...{
    alias: { ...webpackConfig.resolve.alias, ...{
      sinon: 'sinon/pkg/sinon'
    } }
  } }
};

export default (config) => {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: !argv.watch,
    frameworks: [ 'mocha', 'chai' ],
    files: [
      './app/scripts/__tests__/test-bundler.js'
    ],
    preprocessors: {
      './app/scripts/__tests__/test-bundler.js': preprocessors
    },
    reporters: [ 'mocha', 'coverage', 'coveralls' ],
    webpack: { ...webpackConfig, ...webpackTestConfig },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [ {
        type: 'text-summary'
      }, {
        type: 'lcov',
        dir: './coverage/'
      } ]
    }
  });
};
