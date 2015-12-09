import howler from 'howler';
import path from 'path';

export default function (sound) {
  let soundFile = sound.file;
  if (sound.source === 'file') {
    soundFile = `http://data.kakapo.co/v2/sounds/${path.basename(soundFile)}.m4a`;
  }

  return new howler.Howl({
    src: [ soundFile ],
    html5: true,
    loop: true,
    volume: sound.volume,
    autoplay: sound.playing
  });
}
