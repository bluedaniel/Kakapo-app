import test from 'tape';
import { merge } from 'utils/';

test('[utils/merge]', t => {
  t.plan(2);
  t.deepEqual(merge({ w: 1, x: 2 }, { y: 3, z: 4 }), { w: 1, x: 2, y: 3, z: 4 }, 'merge 2 objects');
  t.deepEqual(merge({ w: 1, x: 2 }, { w: 100, y: 3, z: 4 }), { w: 1, x: 2, y: 3, z: 4 }, 'merge 2 objects');
});
