import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';
import webpackTargetElectronRenderer from 'webpack-target-electron-renderer';

const DEBUG = !argv.production;
const VERBOSE = argv.verbose;
const WATCH = global.WATCH === undefined ? false : global.WATCH;

const devServer = 'http://localhost:3000';

let externals = {};
if (argv.platform === 'web') {
  const voidModules = [ 'electron', 'request', 'fs', 'fs-extra' ];
  externals = voidModules.reduce((a, b) => {
    a[b] = 'void 0';
    return a;
  }, {});
}

let config = {
  entry: [
    ...(WATCH ? [ `webpack-hot-middleware/client?path=${devServer}/__webpack_hmr` ] : []),
    './app/scripts/index'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../build'),
    publicPath: WATCH && argv.platform === 'desktop' ? devServer : '/'
  },
  target: argv.platform === 'web' ? 'web' : 'atom',
  externals: externals,
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#eval' : false,
  plugins: [
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
      },
      __DESKTOP__: argv.platform === 'desktop',
      __WEB__: argv.platform === 'web',
      __DEV__: DEBUG
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(__dirname, '../app')
        ],
        loaders: [ 'babel' ]
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpg|ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  resolve: {
    extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx' ],
    alias: {
      kakapoBridge: path.resolve(__dirname, '../app/scripts/bridge', argv.platform)
    }
  },
  postcss: function plugins() {
    return [
      require('postcss-import')({
        onImport: files => files.forEach(this.addDependency)
      }),
      require('postcss-nested')(),
      require('postcss-cssnext')()
    ];
  },

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  }
};

if (argv.platform === 'desktop') {
  config.target = webpackTargetElectronRenderer(config);
}

export default config;
