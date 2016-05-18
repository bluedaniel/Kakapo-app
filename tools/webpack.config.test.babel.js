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
    preLoaders: [ {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|app\/scripts)/,
      loader: 'babel'
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
