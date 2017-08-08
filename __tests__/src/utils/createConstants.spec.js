import test from 'tape';
import { createConstants } from 'utils/';

test('[utils/createConstants]', t => {
  t.plan(1);
  const expected = { TEST1: 'TEST1', TEST2: 'TEST2', TEST3: 'TEST3' };
  t.deepEqual(
    createConstants('TEST1', 'TEST2', 'TEST3'),
    expected,
    'returns key/value object'
  );
});
