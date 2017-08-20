import { argv } from 'yargs';
import run from './run';

process.env.NODE_ENV = JSON.stringify(
  !argv.production ? 'development' : 'production'
);

export default async function build() {
  await run(require('./clean'));
  await run(require('./copy'));
  await run(require('./imagemin'));
  await run(require('./styles')); // External CSS for downloads.css

  if (argv.production) {
    await run(require('./bundle')); // Bundle production JS
  }

  if (argv.platform === 'desktop' && argv.production) {
    await run(require('./pkg')); // Package app into asar format
  }
}
