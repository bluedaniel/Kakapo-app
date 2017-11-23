import packager from 'electron-packager';

export default async function pkg() {
  await packager({
    asar: true,
    dir: 'build',
    icon: 'build/images/app',
    ignore: [],
    out: './release',
    platform: 'all',
    osxSign: true,
  });
}
