import run from './run';

process.env.NODE_ENV = JSON.stringify('development');

export default async function start() {
  await run('build');
  await run('serve');
}
