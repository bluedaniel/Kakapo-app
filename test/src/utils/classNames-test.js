import test from 'tape';
import { classNames } from 'utils/';

test('[utils/classNames]', t => {
  t.plan(4);
  t.equal(classNames('one', 'two', 'three'), 'one two three', 'multiple args');
  t.equal(classNames([ 'one', 'two' ]), 'one two', 'array as args');
  t.equal(classNames([ 'one', 'two', [ 'three' ] ]), 'one two three', 'multi-dimensional arr as args');
  t.equal(classNames('one', { two: true, three: false }), 'one two', 'object as args');
});
