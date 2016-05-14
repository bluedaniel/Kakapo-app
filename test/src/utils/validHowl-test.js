import test from 'tape';
import { validHowl } from 'utils/';

test('[utils/validHowl]', t => {
  t.plan(3);
  t.equal(validHowl('test.invalidExtension'), false, 'rejects `.invalidExtension`');
  t.equal(validHowl('test.mp3'), true, 'accepts `.mp3`');
  t.equal(validHowl('test.ogg'), true, 'accepts `.ogg`');
});
