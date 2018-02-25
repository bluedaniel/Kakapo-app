import archiver from 'archiver';
import fs from 'fs-extra';
import rcedit from 'rcedit';
import { createWindowsInstaller } from 'electron-winstaller';
import packagejson from '../package.json';

async function winRcedit() {
  await new Promise(resolve => {
    console.log(`[${new Date()}] Starting winRcedit ...`);
    rcedit(
      'release/win32/Kakapo-win32-x64/Kakapo.exe',
      {
        icon: 'node_modules/kakapo-assets/images/desktop/app.ico',
        'file-version': packagejson.version,
        'product-version': packagejson.version,
        'version-string': {
          CompanyName: 'Kakapo',
          ProductVersion: packagejson.version,
          ProductName: 'Kakapo',
          FileDescription: 'Kakapo',
          InternalName: 'Kakapo.exe',
          OriginalFilename: 'Kakapo.exe',
        },
      },
      () => resolve(console.log(`[${new Date()}] Finished winRcedit`))
    );
  });
}

async function winZip() {
  await new Promise((resolve, reject) => {
    console.log(`[${new Date()}] Starting winZip ...`);
    const output = fs.createWriteStream(
      `./release/Kakapo-${packagejson.version}-Win.zip`
    );
    const archive = archiver('zip');

    output.on('close', () =>
      resolve(console.log(`[${new Date()}] Finished winZip`))
    );

    archive.on('error', err => reject(err));
    archive.pipe(output);
    archive.bulk([
      {
        expand: true,
        cwd: './release/win32/Kakapo-win32-x64',
        src: ['**/*'],
      },
    ]);
    archive.finalize();
  });
}

async function winSetupExe() {
  await new Promise((resolve, reject) => {
    console.log(`[${new Date()}] Starting winSetupExe ...`);
    try {
      createWindowsInstaller({
        appDirectory: 'release/win32/Kakapo-win32-x64',
        outputDirectory: 'release',
        authors: 'Daniel Levitt',
        loadingGif: 'node_modules/kakapo-assets/images/desktop/loading.gif',
        setupIcon: 'node_modules/kakapo-assets/images/desktop/app.ico',
        iconUrl:
          'https://raw.githubusercontent.com/bluedaniel/Kakapo-assets/master/images/desktop/app.ico',
        description: 'Kakapo',
        title: 'Kakapo',
        exe: 'Kakapo.exe',
        version: packagejson.version,
      }).then(
        () => resolve(console.log(`[${new Date()}] Finished winSetupExe`)),
        e => reject(console.log(`Error: ${e}`))
      );
    } catch (error) {
      console.error(error);
    }
  });
}

export default async function installerWin() {
  await winRcedit();
  await winZip();
  await winSetupExe();
}
