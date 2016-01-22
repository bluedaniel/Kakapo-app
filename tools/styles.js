import fs from 'fs-extra';
import postcss from 'postcss';
import postcssPlugins from './postcss.plugins';
import cssnano from 'cssnano';

export default async function styles() {

  // Minify CSS files
  await Promise.all([ 'downloads', 'loading' ].map(file =>
    new Promise((resolve, reject) => {
      const source = fs.readFileSync(`./app/css/${file}.css`, 'utf8');

      postcss(postcssPlugins).process(source, {
        from: './app/scripts/styles'
      })
      .catch(err => reject(console.error(err.stack)))
      .then(data => {
        const minifyOpts = {
          discardComments: { removeAll: true }
        };
        cssnano.process(data.css, minifyOpts).then(minified =>
          resolve(fs.outputFile(`./build/css/${file}.css`, minified.css)));
      });
    })
  ));

  // Inline some smaller CSS files into the HTML directly
  const inlineOpts = [ {
    html: './build/index.html',
    css: './build/css/loading.css',
    target: '<link href="/css/loading.css" rel="stylesheet" type="text/css">',
    end: (cssData) => `<style type="text/css">${cssData}</style>`
  } ];

  await inlineOpts.map(opt => fs.readFile(opt.html, 'utf8', (err, htmlData) =>
    fs.readFile(opt.css, 'utf8', (err, cssData) => {
      htmlData = htmlData.replace(opt.target, opt.end(cssData));
      fs.outputFile(opt.html, htmlData);
    })
  ));
}
