var webpack = require("webpack");
var path = require("path");
var loadersByExtension = require("../../lib/loaders-by-extension");
var AsyncRoutes = require("../../app/scripts/routes/async");

module.exports = function(opts) {

  var entry = [ "./app/scripts/index" ];

  var loaders = {
    "jsx": opts.hotComponents ? ["react-hot", "babel-loader?optional[]=runtime&stage=1"] : "babel-loader?optional[]=runtime&stage=1",
    "js": {
      loader: "babel-loader?optional[]=runtime&stage=1",
      exclude: /(node_modules|bower_components)/
    },
    "json": "json-loader",
    "html": "html-loader",
    "png|jpg|jpeg|gif": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader"
  };

  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ];

  var asyncLoader = {
    test: AsyncRoutes.map(function(name) {
      return path.resolve(__dirname, "app", "routes", name);
    }),
    loader: opts.prerender ? "react-proxy-loader/unavailable" : "react-proxy-loader"
  };

  // Production
  if (opts.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    entry.unshift(
      "webpack-dev-server/client?http://0.0.0.0:2992",
      "webpack/hot/only-dev-server"
    );
  }

  return {
    entry: entry,

    output: {
      path: path.resolve(__dirname, "../../dist/"),
      filename: "bundle.js",
      publicPath: opts.devServer ? "http://localhost:2992/" : path.resolve(__dirname, "../../dist"),
      contentBase: path.resolve(__dirname, "../../dist")
    },

    target: "web",

    module: {
      loaders: [asyncLoader].concat(loadersByExtension(loaders))
    },

    devtool: opts.devtool,

    debug: opts.debug,

    resolve: {
      root: path.resolve(__dirname, "../../app"),
      modulesDirectories: ["node_modules"],
      extensions: ["", ".js", ".jsx", ".json", ".node"],
      alias: {
        "howler": path.resolve(__dirname, "../../node_modules/howler/howler.min.js"),
        "rx-lite": path.resolve(__dirname, "../../node_modules/rx/dist/rx.lite.js"),
        rx: path.resolve(__dirname, "../../node_modules/rx/dist/rx.lite.extras.js")
      }
    },

    plugins: plugins,

    devServer: {
      hot: true,
      port: 2992,
      progress: true,
      contentBase: path.resolve(__dirname, "../../dist"),
      stats: {
        cached: false,
        exclude: [/node_modules[\\\/]react(-router)?[\\\/]/]
      }
    }
  };
};
