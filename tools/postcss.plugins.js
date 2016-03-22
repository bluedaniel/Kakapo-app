import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCssnext from 'postcss-cssnext';
import lost from 'lost';
import stylelint from 'stylelint';

export { postcssImport as postcssImport };
export { stylelint as stylelint };

export default [
  lost(),
  postcssNested(),
  postcssCssnext()
];
