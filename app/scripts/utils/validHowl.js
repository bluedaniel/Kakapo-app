import { Howler } from 'howler';
import path from 'path';

const codecs = Howler._codecs;
const testCodecs = [ 'mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba' ];

const supported = codecs.length ? Object.keys(codecs) : testCodecs;

export default function validHowl(url, msg) {
  const ext = path.extname(url).substring(1);
  const valid = supported.indexOf(ext) !== -1;

  return msg && !valid ? `File is ${ext}, but must be one of ${supported.join(', ')}` : valid;
}
