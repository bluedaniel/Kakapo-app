import webpack from 'webpack';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  entry: {
    index: [
      'babel-polyfill',
      './app/scripts/index',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    ],
  },
  mode: 'development',
  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
    noParse: baseConfig.module.noParse,
  },
};

export default config;
