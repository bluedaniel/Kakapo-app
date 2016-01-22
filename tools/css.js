import fs from 'fs-extra';
import postcss from 'postcss';
import postcssPlugins from './postcss.plugins';
import cssnano from 'cssnano';

export default async function css() {
  const source = fs.readFileSync('./app/css/downloads.css', 'utf8');
  const output = postcss(postcssPlugins).process(source, {
    from: './app/scripts/styles'
  })
  .catch(err => console.error(err.stack));

  await output.then(data => {
    const minifyOpts = {
      discardComments: { removeAll: true }
    };
    cssnano.process(data.css, minifyOpts).then(minified =>
      fs.outputFile('./build/css/downloads.css', minified.css));
  });
}
