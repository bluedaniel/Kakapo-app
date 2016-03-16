import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';
import FunctionModulePlugin from 'webpack/lib/FunctionModulePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import postcssPlugins, { postcssImport } from './postcss.plugins';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEBUG = !argv.production;
const TEST = process.env.NODE_ENV === 'test';
const platformDevice = argv.platform || 'web';

let externals = {};
if (platformDevice === 'web') {
  const voidModules = [ 'electron', 'request', 'fs', 'fs-extra' ];
  externals = voidModules.reduce((a, b) => {
    a[b] = 'void 0';
    return a;
  }, {});
}

const config = {
  entry: {
    index: [
      './app/scripts/index',
      ...(DEBUG && !TEST ? [ 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr' ] : [])
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    publicPath: '/'
  },
  target: platformDevice === 'web' ? 'web' : 'electron',
  externals,
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#eval' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
      },
      __DESKTOP__: platformDevice === 'desktop',
      __WEB__: platformDevice === 'web',
      __DEV__: DEBUG,
      __TEST__: TEST
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css'),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : []),
    ...(!TEST ? [ new webpack.HotModuleReplacementPlugin() ] : [])
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        include: path.resolve(__dirname, '../app'),
        exclude: /(node_modules|app\/vendor)/,
        loaders: [ 'babel' ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    noParse: [
      /node_modules\/sinon\//,
      /node_modules\/json-schema\/lib\/validate\.js/
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../app/scripts'), // You can do components/nav
      path.resolve(__dirname, '../build') // For minified images
    ],
    extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx' ],
    alias: {
      // Custom AWS build (DynamoDB only) from https://sdk.amazonaws.com/builder/js/
      'aws-custom-build': path.resolve(__dirname, '../app/vendor/aws-sdk-2.2.31.min'),
      kakapoBridge: path.resolve(__dirname, '../app/scripts/bridge', platformDevice)
    }
  },

  postcss: (webpack) => [ postcssImport({ addDependencyTo: webpack }) ].concat(postcssPlugins),

  stats: {
    colors: true,
    reasons: DEBUG,
    timings: true,
    chunks: false,
    assets: false,
    children: false
  }
};

if (platformDevice === 'desktop') {
  config.target = (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(config.output),
      new FunctionModulePlugin(config.output),
      new NodeTargetPlugin(),
      new webpack.ExternalsPlugin('commonjs', [
        'app',
        'auto-updater',
        'browser-window',
        'content-tracing',
        'desktop-capturer',
        'dialog',
        'electron',
        'global-shortcut',
        'ipc',
        'ipc-main',
        'ipc-renderer',
        'menu',
        'menu-item',
        'native-image',
        'power-monitor',
        'power-save-blocker',
        'protocol',
        'tray',
        'remote',
        'web-frame',
        'clipboard',
        'crash-reporter',
        'screen',
        'session',
        'shell'
      ]),
      new webpack.LoaderTargetPlugin(config.target)
    );
  };
}

export default config;
