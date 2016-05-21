import test from 'tape';
import { noop } from 'utils/';

test('[utils/noop]', t => {
  t.plan(1);
  t.equal(noop(), undefined, 'should return undefined');
});
