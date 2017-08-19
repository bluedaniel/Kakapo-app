import { argv } from 'yargs';
import fs from 'fs-extra';
import Imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

const copyFiles = file =>
  fs.copy(`node_modules/kakapo-assets/${file}`, `build/${file}`);

const minifyFiles = file =>
  Imagemin(
    [`node_modules/kakapo-assets/${file}/**/*.{gif,jpg,png,svg,ico,icns}`],
    `build/${file}`,
    {
      plugins: [imageminJpegtran(), imageminPngquant({ quality: '65-80' })]
    }
  ).catch(err => console.log(err));

export default async function imagemin() {
  await Promise.all(['images'].map(argv.production ? minifyFiles : copyFiles));
}
