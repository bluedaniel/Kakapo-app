import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCssnext from 'postcss-cssnext';
import postcssUrl from 'postcss-url';
import lost from 'lost';
import stylelint from 'stylelint';

export { postcssImport };
export { stylelint };

export default function(URL) {
  const pluginArr = [lost(), postcssNested(), postcssCssnext()];
  return URL
    ? pluginArr.concat(
        postcssUrl({
          url: url => url.replace(/^\/+/, '')
        })
      )
    : pluginArr;
}
