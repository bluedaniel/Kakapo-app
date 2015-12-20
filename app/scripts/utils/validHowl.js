import { Howler } from 'howler';
import path from 'path';

export default function validHowl(url, msg) {
  const ext = path.extname(url).substring(1);
  if (!msg) return Howler._codecs[ext];

  if (!Howler._codecs[ext]) {
    return `File is is ${ext}, but must be one of ${Object.keys(Howler._codecs).join(', ')}`;
  }
}
