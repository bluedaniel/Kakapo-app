import { argv } from 'yargs';
import path from 'path';
import webpack from 'webpack';
import FunctionModulePlugin from 'webpack/lib/FunctionModulePlugin';
import NodeTargetPlugin from 'webpack/lib/node/NodeTargetPlugin';

const JsonpTemplatePlugin = webpack.JsonpTemplatePlugin;
const ExternalsPlugin = webpack.ExternalsPlugin;
const LoaderTargetPlugin = webpack.LoaderTargetPlugin;

const DEBUG = !argv.production;

let externals = {};
if (argv.platform === 'web') {
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
  target: argv.platform === 'web' ? 'web' : 'electron',
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
      /aws\-sdk/,
      /node_modules\/json-schema\/lib\/validate\.js/
    ]
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
    timings: true
  }
};

if (argv.platform === 'desktop') {
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
