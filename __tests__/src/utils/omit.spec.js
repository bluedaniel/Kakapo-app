import test from 'tape';
import { omit, compose } from 'utils/';

test('[utils/omit]', t => {
  t.plan(2);
  const setup1 = compose(omit('foo'))({ foo: 2, bar: 1, baz: 4, boo: false });
  t.deepEqual(setup1, { bar: 1, baz: 4, boo: false }, 'remove `foo`');

  const setup2 = compose(omit(['bar', 'boo', 'beam']))({
    foo: 2,
    bar: 1,
    baz: 4,
    boo: false
  });
  t.deepEqual(setup2, { foo: 2, baz: 4 }, 'remove `boo` & `bar`');
});
