import fs from 'fs-extra';

export default async function clean() {
  await Promise.all([
    fs.remove('./release'),
    fs.remove('./.tmp'),
    fs.remove('./build')
  ]);
  await fs.mkdirs('./build');
  await fs.mkdirs('./.tmp/sounds');
  await fs.mkdirs('./.tmp/user-data');
}
