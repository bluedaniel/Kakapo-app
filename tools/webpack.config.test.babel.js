import baseConfig from './webpack.config.base';
import path from 'path';

const config = {
  ...baseConfig,
  entry: {
    index: './test/test-bundler.js'
  },
  output: {
    filename: './.tmp/test.bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [ {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|app\/scripts)/,
      loader: 'babel'
    }, {
      test: /\.(js|jsx)$/,
      include: path.resolve('app/scripts/'),
      exclude: /(bridge)/,
      loader: 'isparta'
    } ],
    loaders: [ ...baseConfig.module.loaders, {
      test: /\.css$/,
      loader: 'null-loader'
    }, {
      test: /sinon.*\.js$/,
      loader: 'imports?define=>false,require=>false'
    } ],
    noParse: baseConfig.module.noParse
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: { ...baseConfig.externals,
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  },
  resolve: { ...baseConfig.resolve, ...{
    alias: { ...baseConfig.resolve.alias, ...{
      sinon: 'sinon/pkg/sinon'
    } }
  } }
};

export default config;
