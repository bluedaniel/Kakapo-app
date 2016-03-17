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
  module: {
    loaders: baseConfig.module.loaders.concat([ {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader'
    } ]),
    noParse: [
      /node_modules\/sinon\//,
      /node_modules\/json-schema\/lib\/validate\.js/
    ]
  }
};

export default config;
