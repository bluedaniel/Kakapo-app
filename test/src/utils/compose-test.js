import test from 'tape';
import { compose } from 'utils/';

const minusTwo = x => x - 2;
const plusFour = x => x + 4;
const timesTwo = x => x * 2;

test('[utils/compose]', t => {
  t.plan(2);
  t.equal(typeof compose(timesTwo, plusFour, minusTwo), 'function', 'should return a function');
  t.equal(compose(timesTwo, plusFour, minusTwo)(9), 22, 'should reduce functions right to left');
});
