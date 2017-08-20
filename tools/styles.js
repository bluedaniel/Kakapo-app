import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import postcssPlugins, { postcssImport } from './postcss.plugins';

const cssDir = './app/css';

export default async function styles() {
  // Minify external CSS files
  const cssMin = fs
    .readdirSync(`${cssDir}/external`)
    .filter(file => path.extname(file) === '.css')
    .map(
      file =>
        new Promise((resolve, reject) => {
          const source = fs.readFileSync(`${cssDir}/external/${file}`, 'utf8');

          postcss(postcssPlugins().concat(postcssImport()))
            .process(source, {
              from: './app/scripts/styles'
            })
            .catch(err => reject(console.error(err.stack)))
            .then(data => {
              const minifyOpts = {
                discardComments: { removeAll: true }
              };
              cssnano.process(data.css, minifyOpts).then(minified =>
                fs.outputFile(`./build/css/${file}`, minified.css, err => {
                  if (err) return reject(err);
                  return resolve();
                })
              );
            });
        })
    );

  const targetHtml = './build/index.html';

  // Inline some smaller CSS files into the HTML directly
  const cssInline = fs.readFile(targetHtml, 'utf8', (err, htmlData) =>
    fs
      .readdirSync(`${cssDir}/inline`)
      .filter(file => path.extname(file) === '.css')
      .map(cssFile =>
        fs.readFile(`${cssDir}/inline/${cssFile}`, 'utf8', (err, cssData) => {
          htmlData = htmlData.replace(
            '<body>',
            `<style type="text/css">${cssData}</style>\n<body>`
          );
          fs.outputFile(targetHtml, htmlData);
        })
      )
  );

  await Promise.all([cssMin, cssInline]);
}
