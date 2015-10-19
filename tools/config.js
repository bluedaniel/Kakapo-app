import path from "path";
import webpack from "webpack";

const DEBUG = !process.argv.includes("release");
const VERBOSE = process.argv.includes("verbose");
const WATCH = global.WATCH === undefined ? false : global.WATCH;

if (!DEBUG) {
  process.env.NODE_ENV = "production";
}

export default {
  entry: [
    ...(WATCH ? ["webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr"] : []),
    "./app/scripts/index"
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../build"),
    publicPath: "/"
  },
  target: "atom",
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? "#eval" : false,
  plugins: [
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": DEBUG ? "'development'" : "'production'",
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
          path.resolve(__dirname, "../app")
        ],
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(jpg|woff2)$/,
        loader: "file-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  postcss: function plugins() {
    return [
      require("postcss-import")({
        onImport: files => files.forEach(this.addDependency)
      }),
      require("postcss-nested")(),
      require("postcss-cssnext")()
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
