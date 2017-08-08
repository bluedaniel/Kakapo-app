import test from 'tape';
import { flatten, flatteni18n } from 'utils/';

test('[utils/flatten]', t => {
  t.plan(2);
  t.deepEqual(
    flatten([1, 2, 3, 4, 5]),
    [1, 2, 3, 4, 5],
    'returns an already flat array'
  );
  t.deepEqual(
    flatten([1, [2, [3, [4]], 5]]),
    [1, 2, 3, 4, 5],
    'flattens multi-dimensional array'
  );
});

test('[utils/flatteni18n]', t => {
  t.plan(1);
  t.deepEqual(
    flatteni18n({ a: { b: { b2: 2 }, c: { c2: 2 } } }),
    { 'a.b.b2': 2, 'a.c.c2': 2 },
    'flattens object to key/value with full paths'
  );
});
