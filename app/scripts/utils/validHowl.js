import { Howler } from 'howler';
import path from 'path';

const codecs = Howler._codecs;
const testCodecs = [ 'mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba' ];

const supportedCodecs = codecs.length ? Object.keys(codecs) : testCodecs;

export default function validHowl(url, msg) {
  const ext = path.extname(url).substring(1);
  const valid = supportedCodecs.indexOf(ext) !== -1;

  if (!msg) return valid;
  if (!valid) return `File is is ${ext}, but must be one of ${supportedCodecs.join(', ')}`;
}
