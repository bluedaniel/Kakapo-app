import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  ...baseConfig,
  entry: {
    index: [
      './app/scripts/index',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ]
  },
  plugins: [ ...baseConfig.plugins,
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [ ...baseConfig.module.loaders, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    } ],
    noParse: baseConfig.module.noParse
  }
};

export default config;
