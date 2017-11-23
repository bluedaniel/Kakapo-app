import { Howl } from 'howler/dist/howler.core.min';
import path from 'path';
import { pathConfig } from 'utils/';

export default ({ file, source, volume }) => {
  let soundFile = file;
  if (source === 'file') {
    if (__WEB__)
      soundFile = `http://data.kakapo.co/v2/sounds/${path.basename(
        soundFile
      )}.ogg`;
    /* istanbul ignore if */
    if (__DESKTOP__)
      soundFile = `${path.join(pathConfig.soundDir, soundFile)}.ogg`;
  }

  return new Howl({
    src: [soundFile],
    html5: true,
    loop: true,
    volume,
  });
};
