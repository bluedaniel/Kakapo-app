import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';
import FunctionModulePlugin from 'webpack/lib/FunctionModulePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import postcssPlugins, { postcssImport } from './postcss.plugins';

const DEBUG = !argv.production;
const platformDevice = argv.platform || 'web';

let externals = {};
if (platformDevice === 'web') {
  const voidModules = [ 'electron', 'request', 'fs', 'fs-extra' ];
  externals = voidModules.reduce((a, b) => ({ ...a, [b]: 'void 0' }), {});
}

const config = {
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
      __TEST__: process.env.NODE_ENV === 'test'
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [ {
      test: /\.(js|jsx)?$/,
      include: path.resolve(__dirname, '../app'),
      exclude: /(node_modules|app\/vendor)/,
      loader: 'babel'
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)$/,
      loader: 'file-loader?name=fonts/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    } ],
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
        'app', 'auto-updater',
        'browser-window', 'content-tracing', 'desktop-capturer', 'dialog',
        'electron', 'global-shortcut', 'ipc', 'ipc-main', 'ipc-renderer',
        'menu', 'menu-item', 'native-image', 'power-monitor',
        'power-save-blocker', 'protocol', 'tray', 'remote', 'web-frame',
        'clipboard', 'crash-reporter', 'screen', 'session', 'shell'
      ]),
      new webpack.LoaderTargetPlugin(config.target)
    );
  };
}

export default config;
