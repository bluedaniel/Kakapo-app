import { argv } from 'yargs';
import run from './run';

process.env.NODE_ENV = JSON.stringify('development');

export default async function start() {
  if (!argv.platform) {
    throw new Error('Missing flag `--platform`');
  }
  await run('build');
  await run('serve');
}
