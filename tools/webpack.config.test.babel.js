import path from 'path';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  entry: {
    index: './test/test-bundler.js'
  },
  output: {
    filename: './.tmp/test.bundle.js'
  },
  target: 'node',
  devtool: 'eval',
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, '../test/src'),
        exclude: /(node_modules|app\/vendor|\.tmp)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
      {
        test: /sinon.*\.js$/,
        loader: 'imports?define=>false,require=>false'
      }
    ],
    noParse: baseConfig.module.noParse
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    ...baseConfig.externals,
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  },
  resolve: {
    ...baseConfig.resolve,
    ...{
      alias: {
        ...baseConfig.resolve.alias,
        ...{
          sinon: 'sinon/pkg/sinon',
          'aws-custom-build': 'void 0'
        }
      }
    }
  }
};

export default config;
