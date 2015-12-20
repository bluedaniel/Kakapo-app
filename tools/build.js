import run from './run';

export default async function build() {
  await run(require('./clean'));
  await run(require('./copy'));
  await run(require('./css'));
  await run(require('./bundle'));
}
