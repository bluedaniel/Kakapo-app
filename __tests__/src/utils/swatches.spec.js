import test from 'tape';
import { swatches } from 'utils/';

test('[utils/swatches]', t => {
  t.plan(3);
  t.equal(swatches().length, 20, 'returns 20 colors in array');
  t.equal(swatches('dark').length, 17, 'returns 17 dark colors in array');
  t.equal(swatches('light').length, 3, 'returns 3 light colors in array');
});
