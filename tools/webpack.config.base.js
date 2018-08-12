import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';

const DEBUG = !argv.production;
const platformDevice = argv.platform || 'web';

let externals = {};
if (platformDevice === 'web') {
  const voidModules = ['electron', 'request', 'fs', 'fs-extra'];
  externals = voidModules.reduce(
    (a, b) => ({ ...a, [b]: 'void 0' }),
    externals
  );
}

export default {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    publicPath: '/',
  },
  target: platformDevice === 'web' ? 'web' : 'electron-renderer',
  externals,
  cache: DEBUG,
  devtool: DEBUG ? 'eval-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        DEBUG ? 'development' : 'production'
      ),
      __DESKTOP__: platformDevice === 'desktop',
      __WEB__: platformDevice === 'web',
      __DEV__: DEBUG,
      __TEST__: process.env.NODE_ENV === 'test',
    }),
    new webpack.ProvidePlugin({
      fetch:
        'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, '../app'),
        exclude: /(node_modules|app\/vendor)/,
        use: 'babel-loader',
      },
    ],
    noParse: [
      path.resolve('node_modules/sinon'),
      path.resolve('node_modules/json-schema/lib/validate.js'),
      path.resolve('../app/vendor'),
    ],
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
      path.resolve(__dirname, '../app/scripts'), // You can do components/nav
      path.resolve(__dirname, '../build'), // For minified images
    ],
    extensions: ['.js'],
    alias: {
      kakapoBridge: path.resolve(
        __dirname,
        '../app/scripts/bridge',
        platformDevice
      ),
    },
  },
  stats: 'minimal',
};
