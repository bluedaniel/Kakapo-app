import run from './run';

process.env.NODE_ENV = JSON.stringify('development');

export default async function start() {
  await run(require('./build'));
  await run(require('./serve'));
}
