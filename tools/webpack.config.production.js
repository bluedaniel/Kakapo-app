import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  entry: {
    index: ['babel-polyfill', './app/scripts/index'],
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
    noParse: baseConfig.module.noParse,
  },
};

export default config;
