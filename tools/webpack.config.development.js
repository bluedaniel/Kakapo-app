import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  entry: {
    index: [
      './app/scripts/index',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ],
    noParse: baseConfig.module.noParse
  }
};

export default config;
