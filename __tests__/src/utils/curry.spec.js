import test from 'tape';
import { curry } from 'utils/';

test('[utils/curry]', t => {
  t.plan(2);
  const setup = curry((x, y, z) => x * y + z);
  t.equal(typeof setup, 'function', 'should return a function');
  t.equal(setup(1)(2)(3), 5, 'should curry arguments left to right');
});
