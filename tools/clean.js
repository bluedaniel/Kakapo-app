import fs from 'fs-extra';

export default async function clean() {
  await Promise.all([
    fs.removeSync('release'),
    fs.removeSync('.tmp'),
    fs.removeSync('build/*')
  ]);
  await fs.mkdirs('build');
  await fs.mkdirs('.tmp/sounds');
  await fs.mkdirs('.tmp/user-data');
}
