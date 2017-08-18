import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  entry: {
    index: ['babel-polyfill', './app/scripts/index']
  },
  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?-url', 'postcss-loader']
        })
      }
    ],
    noParse: baseConfig.module.noParse
  }
};

export default config;
