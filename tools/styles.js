import fs from 'fs-extra';
import postcss from 'postcss';
import postcssPlugins, { postcssImport } from './postcss.plugins';
import cssnano from 'cssnano';

export default async function styles() {
  // Minify CSS files
  const cssMin = [ 'downloads', 'loading' ].map(file =>
    new Promise((resolve, reject) => {
      const source = fs.readFileSync(`./app/css/${file}.css`, 'utf8');

      postcss(postcssPlugins.concat(postcssImport())).process(source, {
        from: './app/scripts/styles'
      })
      .catch(err => reject(console.error(err.stack)))
      .then(data => {
        const minifyOpts = {
          discardComments: { removeAll: true }
        };
        cssnano.process(data.css, minifyOpts).then(minified =>
          fs.outputFile(`./build/css/${file}.css`, minified.css, err => {
            if (err) return reject(err);
            resolve();
          }));
      });
    })
  );

  // Inline some smaller CSS files into the HTML directly
  const inlineOpts = [ {
    html: './build/index.html',
    css: './build/css/loading.css',
    target: '<link href="/css/loading.css" rel="stylesheet" type="text/css">',
    end: (cssData) => `<style type="text/css">${cssData}</style>`
  } ];

  const cssInline = inlineOpts.map(opt => new Promise((resolve, reject) =>
    fs.readFile(opt.html, 'utf8', (err, htmlData) =>
      fs.readFile(opt.css, 'utf8', (err, cssData) => {
        htmlData = htmlData.replace(opt.target, opt.end(cssData));
        fs.outputFile(opt.html, htmlData, (err) => {
          if (err) return reject(err);
          resolve();
        });
      })
    )));

  await Promise.all(cssMin.concat(cssInline));
}
