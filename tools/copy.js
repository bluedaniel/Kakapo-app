import { argv } from 'yargs';
import fs from 'fs-extra';
import proc from 'child_process';
import Bluebird from 'bluebird';

const fsPromise = Bluebird.promisifyAll(fs);

export default async function copy() {
  const indexFile = argv.production ? 'index' : 'index-dev';

  await fsPromise.copyAsync('./node_modules/kakapo-assets/icomoon/fonts', 'build/fonts', {});
  await fsPromise.copyAsync('app/fonts', 'build/fonts', {});

  if (argv.platform === 'desktop') {
    proc.execSync('babel app/browser.js --out-file build/browser.js');
    await fsPromise.copyAsync('package.json', 'build/package.json', {});
    await fsPromise.copyAsync(`app/html/desktop/${indexFile}.html`, 'build/index.html', {});
    await fsPromise.copySync('./node_modules/kakapo-assets/sounds', 'build/sounds', {
      filter: /.ogg$/i
    });
    await fsPromise.copyAsync('./node_modules/kakapo-assets/data', 'build/data', {});
  }

  if (argv.platform === 'web') {
    await fsPromise.copyAsync(`app/html/web/${indexFile}.html`, 'build/index.html', {});
    await fsPromise.copyAsync('app/html/web/app.html', 'build/app.html', {});
  }
}
