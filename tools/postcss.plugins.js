import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCssnext from 'postcss-cssnext';
import postcssReporter from 'postcss-reporter';
import stylelint from 'stylelint';

export { postcssImport as postcssImport };
export { stylelint as stylelint };

export default [
  postcssNested(),
  postcssCssnext(),
  postcssReporter({ clearMessages: true })
];
