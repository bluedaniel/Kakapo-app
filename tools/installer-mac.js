import proc from 'child_process';
import packagejson from '../package.json';

export default async function installerMac() {
  const opts = {
    identity: 'Developer ID Application: Daniel Levitt',
    name: 'Kakapo',
    v: packagejson.version,
    file: './release/darwin/Kakapo-darwin-x64/Kakapo.app'
  };
  [
    `codesign --deep -v -f -s '${opts.identity}' ${opts.file}/Contents/Frameworks/*`,
    `codesign -v -f -s '${opts.identity}' ${opts.file}`,
    `codesign -vvv --display ${opts.file}`,
    `codesign -v --verify ${opts.file}`,
    'mkdir -p release',
    'chmod +x release',
    `ditto -c -k --sequesterRsrc --keepParent ${opts.file} release/${opts.name}-${opts.v}-Mac.zip`
  ].forEach(_p => proc.execSync(_p));
}
