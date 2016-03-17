import webpackConfig from '../tools/webpack.config';

// module.exports = webpackConfig;

// fs.writeFile('some.txt', `module.exports = { ${webpackConfig} };`);
/**
 * TEST WEBPACK CONFIGURATION
 */

module.exports = {
  devtool: 'inline-source-map',
  plugins: webpackConfig.plugins,
  module: {
    // Some libraries don't like being run through babel.
    // If they gripe, put them here.
    noParse: [
      /node_modules(\\|\/)sinon/,
      /node_modules(\\|\/)acorn/
    ],
    preLoaders: [ {
      test: /\.(js|jsx)?$/,
      loader: 'isparta',
      include: /app\/scripts/,
      exclude: /(test|node_modules|bridge)\//
    } ],
    loaders: webpackConfig.module.loaders
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: { ...webpackConfig.externals, ...{
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  } },
  resolve: webpackConfig.resolve
};
