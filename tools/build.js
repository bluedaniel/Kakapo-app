import { argv } from 'yargs';
import run from './run';

process.env.NODE_ENV = JSON.stringify(
  !argv.production ? 'development' : 'production'
);

export default async function build() {
  await run('clean');
  await run('copy');
  await run('imagemin');
  await run('styles'); // External CSS for downloads.css

  if (argv.production) {
    await run('bundle'); // Bundle production JS
  }

  if (argv.platform === 'desktop' && argv.production) {
    await run('pkg'); // Package app into asar format
  }
}
