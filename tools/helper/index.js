import fs from 'fs-extra';

// Upload stats.json to `http://webpack.github.io/analyse` for analysis.
// Also you can analyze size with `https://github.com/robertknight/webpack-bundle-size-analyzer`:
// `cat stats.json | analyze-bundle-size`
export const writeStats = stats =>
  fs.writeFile('stats.json', JSON.stringify(stats.toJson(), null, 4));

export default {};
