import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';
import FunctionModulePlugin from 'webpack/lib/FunctionModulePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';
import postcssPlugins from './postcss.plugins';

const JsonpTemplatePlugin = webpack.JsonpTemplatePlugin;
const ExternalsPlugin = webpack.ExternalsPlugin;
const LoaderTargetPlugin = webpack.LoaderTargetPlugin;

const DEBUG = !argv.production;
const platformDevice = argv.platform || 'web';

let externals = {};
if (platformDevice === 'web') {
  const voidModules = [ 'electron', 'request', 'fs', 'fs-extra' ];
  externals = voidModules.reduce((a, b) => {
    a[b] = 'void 0';
    return a;
  }, {});
}

let config = {
  entry: {
    index: [
      './app/scripts/index',
      ...(DEBUG ? [ `webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr` ] : [])
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    publicPath: '/'
  },
  target: platformDevice === 'web' ? 'web' : 'electron',
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
      __DESKTOP__: platformDevice === 'desktop',
      __WEB__: platformDevice === 'web',
      __DEV__: DEBUG
    }),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ])
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
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
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
    noParse: [
      /node_modules\/sinon\//,
      /node_modules\/json-schema\/lib\/validate\.js/
    ]
  },
  resolve: {
    root: path.resolve(__dirname, '../app/scripts'),
    extensions: [ '', '.webpack.js', '.web.js', '.js', '.jsx' ],
    alias: {
      // Custom AWS build (DynamoDB only) from https://sdk.amazonaws.com/builder/js/
      'aws-custom-build': path.resolve(__dirname, '../app/vendor/aws-sdk-2.2.31.min'),
      rx: 'rx/dist/rx.lite',
      kakapoBridge: path.resolve(__dirname, '../app/scripts/bridge', platformDevice)
    }
  },
  postcss: function plugins() {
    return postcssPlugins;
  },
  stats: {
    colors: true,
    reasons: DEBUG,
    timings: true,
    chunks: false
  }
};

if (platformDevice === 'desktop') {
  config.target = function (compiler) {
    compiler.apply(
      new JsonpTemplatePlugin(config.output),
      new FunctionModulePlugin(config.output),
      new NodeTargetPlugin(),
      new ExternalsPlugin('commonjs', [
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
      new LoaderTargetPlugin(config.target)
    );
  };
}

export default config;
