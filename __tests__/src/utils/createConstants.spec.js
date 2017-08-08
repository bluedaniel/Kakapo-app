import { createConstants } from 'utils/';

test('[utils/createConstants]', () => {
  expect.assertions(1);
  const expected = { TEST1: 'TEST1', TEST2: 'TEST2', TEST3: 'TEST3' };
  expect(createConstants('TEST1', 'TEST2', 'TEST3')).toEqual(expected);
});
