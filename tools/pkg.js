import packager from 'electron-packager';
import del from 'del';
import packagejson from '../package.json';

const opts = {
  'app-version': packagejson.version,
  asar: true,
  dir: 'build',
  icon: 'build/images/desktop/app',
  name: 'Kakapo',
  version: '0.36.1',
  ignore: [
    '/user-data($|/)'
  ]
};

export default async function pkg() {
  await del('release');
  await Promise.all([ 'linux', 'win32', 'darwin' ].map(plat =>
    new Promise((resolve, reject) =>
      packager({ ...opts, ... {
        platform: plat,
        arch: 'x64',
        out: './release/' + plat
      } }, (err, path) => {
        if (err) reject(err);
        resolve(path);
      })
    )
  ));
}
