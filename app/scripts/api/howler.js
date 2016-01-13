import howler from 'howler';
import path from 'path';
import { pathConfig } from 'utils/';

export default function getHowlerObj(sound) {
  let soundFile = sound.file;
  if (sound.source === 'file') {
    if (__WEB__) soundFile = `http://data.kakapo.co/v2/sounds/${path.basename(soundFile)}.ogg`;
    if (__DESKTOP__) soundFile = `${path.join(pathConfig.soundDir, soundFile)}.ogg`;
  }

  return new howler.Howl({
    src: [ soundFile ],
    html5: true,
    loop: true,
    volume: sound.volume,
    autoplay: sound.playing
  });
}
