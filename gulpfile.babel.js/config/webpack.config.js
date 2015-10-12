import webpack from "webpack";
import path from "path";
import loadersByExtension from "../../lib/loaders-by-extension";
import AsyncRoutes from "../../app/scripts/routes/async";

export default function(opts) {

  var entry = [ "./app/scripts/index" ];

  var loaders = {
    "jsx|js": {
      loader: "babel-loader",
      exclude: /(node_modules|bower_components)/
    },
    "json": "json-loader",
    "html": "html-loader",
    "png|jpg|jpeg|gif": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader"
  };

  var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/vertx/),
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
      "webpack-hot-middleware/client?path=http://localhost:" + (process.env.PORT || 3000) + "/__webpack_hmr"
    );
  }

  var dist = path.resolve(__dirname, "../../dist/");

  return {
    entry: entry,

    output: {
      path: dist,
      filename: "bundle.js",
      publicPath: opts.devServer ? "http://localhost:" + (process.env.PORT || 3000) + "/" : dist,
      contentBase: dist
    },

    target: "atom",

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
        "rx-lite": path.resolve(__dirname, "../../node_modules/rx/dist/rx.lite.js"),
        rx: path.resolve(__dirname, "../../node_modules/rx/dist/rx.lite.extras.js")
      }
    },

    plugins: plugins
  };
};
