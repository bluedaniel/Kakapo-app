import { noop } from 'utils/';

test('[utils/noop]', () => {
  expect(noop()).toBe(undefined);
});
