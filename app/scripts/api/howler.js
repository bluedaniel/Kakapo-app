import howler from "howler";
import path from "path";
import { pathConfig } from "../utils";

export default function(sound) {
  let src = sound.file;
  if (sound.source === "file") src = path.join(pathConfig.soundDir, src);
  return new howler.Howl({
    src: [ src ],
    html5: true,
    loop: true,
    volume: sound.volume,
    autoplay: sound.playing
  });
}
