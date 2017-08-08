import { safe } from 'utils/';

test('[utils/safe]', () => {
  expect.assertions(3);
  expect(safe(() => 'hello')).toBe('hello');
  expect(safe(() => foo)).toBe(undefined);
  expect(safe(() => bar, 'baz')).toBe('baz');
});
