import packager from 'electron-packager';

export default async function pkg() {
  await packager({
    asar: true,
    dir: 'build',
    icon: 'build/images/app',
    ignore: [],
    name: 'Kakapo',
    out: './release',
    platform: 'all',

    // OSX
    appBundleId: 'com.supercerebral.mac.kakapo',
    appCategoryType: 'public.app-category.productivity',
    extendInfo: { ElectronTeamID: 'A6K3VKBW43' },
    osxSign: true,
  });
}
