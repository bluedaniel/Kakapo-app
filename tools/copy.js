import { argv } from 'yargs';
import fs from 'fs-extra';
import proc from 'child_process';

export default async function copy() {
  const indexFile = argv.production ? 'index' : 'index-dev';

  await fs.copy('./node_modules/kakapo-assets/icomoon/fonts', 'build/fonts');
  await fs.copy('app/fonts', 'build/fonts');

  if (argv.platform === 'desktop') {
    proc.execSync('babel app/browser.js --out-file build/browser.js');
    await fs.copy('package.json', 'build/package.json');
    await fs.copy(`app/html/desktop/${indexFile}.html`, 'build/index.html');
    await fs.copy('./node_modules/kakapo-assets/sounds', 'build/sounds', {
      filter: str => !!str.match(/.ogg$/i)
    });
    await fs.copy('./node_modules/kakapo-assets/data', 'build/data');
  }

  if (argv.platform === 'web') {
    await fs.copy(`app/html/web/${indexFile}.html`, 'build/index.html');
    await fs.copy('app/html/web/app.html', 'build/app.html');
  }
}
