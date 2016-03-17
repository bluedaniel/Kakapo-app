import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,
  module: {
    loaders: baseConfig.module.loaders.concat([ {
      test: /\.css$/,
      loader: 'null-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'null-loader'
    } ]),
    noParse: [
      /node_modules\/sinon\//,
      /node_modules\/json-schema\/lib\/validate\.js/
    ]
  }
};

export default config;
