import howler from "howler";

export default function(sound) {
  return new howler.Howl({
    src: [`./sounds/${sound.file}`],
    html5: true,
    loop: true,
    volume: sound.volume,
    autoplay: sound.playing
  });
}
