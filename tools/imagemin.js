import { argv } from 'yargs';
import fs from 'fs-extra';
import Imagemin from 'imagemin';
import Bluebird from 'bluebird';

const fsPromise = Bluebird.promisifyAll(fs);

const copyFiles = file => fsPromise.copyAsync(`node_modules/kakapo-assets/${file}`, `build/${file}`, {});

const minifyFiles = file => new Promise((resolve, reject) => new Imagemin()
  .src(`node_modules/kakapo-assets/${file}/**/*.{gif,jpg,png,svg,ico,icns}`)
  .dest(`build/${file}`)
  .use(Imagemin.jpegtran({ progressive: true }))
  .use(Imagemin.optipng({ optimizationLevel: 3 }))
  .run((err, files) => {
    if (err) return reject(console.log(err));
    resolve(files);
  })
);

export default async function imagemin() {
  await Promise.all([
    'icons',
    'images'
  ].map(argv.production ? minifyFiles : copyFiles));
}
