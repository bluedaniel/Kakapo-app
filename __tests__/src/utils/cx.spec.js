import { cx } from 'utils/';

test('[utils/cx]', () => {
  expect(cx('one', 'two', 'three')).toBe('one two three');
  expect(cx(['one', 'two'])).toBe('one two');
  expect(cx(['one', 'two', ['three']])).toBe('one two three');
  expect(cx('one', { two: true, three: false })).toBe('one two');
});
