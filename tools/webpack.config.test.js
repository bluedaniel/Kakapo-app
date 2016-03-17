import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  devtool: 'inline-source-map',
  module: {
    preLoaders: [ {
      test: /\.(js|jsx)?$/,
      loader: 'isparta',
      include: /app\/scripts/,
      exclude: /(test|__tests__|node_modules|bridge)\//
    } ],
    loaders: [ ...baseConfig.module.loaders, [ {
      test: /\.css$/,
      loader: 'null-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'null-loader'
    } ] ],
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
