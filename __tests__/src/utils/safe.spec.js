import test from 'tape';
import { safe } from 'utils/';

test('[utils/safe]', t => {
  t.plan(3);
  t.equal(
    safe(() => 'hello'),
    'hello',
    'should return the return value of the supplied function if it is safe'
  );
  t.equal(safe(() => foo), undefined, 'return undefined');
  t.equal(
    safe(() => bar, 'baz'),
    'baz',
    'should return the alternative provided if the function throws an error'
  );
});
