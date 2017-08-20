import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
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
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
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
