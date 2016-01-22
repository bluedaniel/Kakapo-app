import fs from 'fs-extra';
import Bluebird from 'bluebird';

const fsPromise = Bluebird.promisifyAll(fs);

export default async function clean() {
  await Promise.all([
    fsPromise.removeAsync('release'),
    fsPromise.removeAsync('.tmp'),
    fsPromise.removeAsync('build/*')
  ]);
  await fsPromise.mkdirsAsync('build');
  await fsPromise.mkdirsAsync('.tmp/sounds');
  await fsPromise.mkdirsAsync('.tmp/user-data');
}
