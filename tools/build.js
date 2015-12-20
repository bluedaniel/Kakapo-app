import { argv } from 'yargs';
import run from './run';

process.env.NODE_ENV = JSON.stringify(!argv.production ? 'development' : 'production');

export default async function build() {
  await run(require('./clean'));
  await run(require('./copy'));
  await run(require('./css'));
  await run(require('./bundle'));
}
