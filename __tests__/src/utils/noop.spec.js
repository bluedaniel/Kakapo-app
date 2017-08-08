import { noop } from 'utils/';

test('[utils/noop]', () => {
  expect.assertions(1);
  expect(noop()).toBe(undefined);
});
