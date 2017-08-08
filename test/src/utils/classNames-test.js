import test from 'tape';
import { cx } from 'utils/';

test('[utils/cx]', t => {
  t.plan(4);
  t.equal(cx('one', 'two', 'three'), 'one two three', 'multiple args');
  t.equal(cx(['one', 'two']), 'one two', 'array as args');
  t.equal(
    cx(['one', 'two', ['three']]),
    'one two three',
    'multi-dimensional arr as args'
  );
  t.equal(cx('one', { two: true, three: false }), 'one two', 'object as args');
});
