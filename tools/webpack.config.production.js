import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  ...baseConfig,
  entry: {
    index: [ './app/scripts/index' ]
  },
  plugins: [ ...baseConfig.plugins,
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    loaders: [ ...baseConfig.module.loaders, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url!postcss-loader')
    } ],
    noParse: baseConfig.module.noParse
  }
};

export default config;
