import Imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

const minifyFiles = file =>
  Imagemin(
    [`node_modules/kakapo-assets/${file}/**/*.{gif,jpg,png,svg,ico,icns}`],
    `build/${file}`,
    {
      plugins: [imageminJpegtran(), imageminPngquant({ quality: '65-80' })],
    }
  );

export default async function imagemin() {
  await Promise.all(['images'].map(minifyFiles));
}
