import { argv } from 'yargs';
import fs from 'fs-extra';
import proc from 'child_process';

const indexFile = process.env.NODE_ENV === '"development"' ? 'index-dev' : 'index';

export default async function copy() {
  await fs.copy('node_modules/kakapo-assets/icons', 'build/icons', {});
  await fs.copy('node_modules/kakapo-assets/images', 'build/images', {});

  if (argv.platform === 'desktop') {
    proc.execSync('babel app/browser.js --out-file build/browser.js'),
    await fs.copy('package.json', 'build/package.json', {});
    await fs.copy('app/html/desktop/loading.css', 'build/loading.css', {});
    await fs.copy(`app/html/desktop/${indexFile}.html`, 'build/index.html', {});
    await fs.copySync('./node_modules/kakapo-assets/sounds', 'build/sounds', {
      filter: /.ogg$/i
    });
    await fs.copy('./node_modules/kakapo-assets/data', 'build/data', {});
  }

  if (argv.platform === 'web') {
    await fs.copy('app/html/web', 'build', {});
    await fs.copy('app/favicons', 'build/favicons', {});
  }
}
