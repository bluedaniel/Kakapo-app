import fs from 'fs-extra';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCssnext from 'postcss-cssnext';

export default async function css() {
  const postcssProcessor = postcss()
  .use(postcssImport())
  .use(postcssNested())
  .use(postcssCssnext());

  const source = fs.readFileSync('./app/css/downloads.css', 'utf8');
  const output = postcssProcessor.process(source, {
    from: './app/scripts/styles'
  }).css;

  await fs.outputFile('./build/css/downloads.css', output);
}
