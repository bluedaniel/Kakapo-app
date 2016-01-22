import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCssnext from 'postcss-cssnext';
import postcssReporter from 'postcss-reporter';
import stylelint from 'stylelint';

export default [
  stylelint(),
  postcssImport(),
  postcssNested(),
  postcssCssnext(),
  postcssReporter({ clearMessages: true })
];
