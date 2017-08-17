import { swatches } from 'utils/';

test('[utils/swatches]', () => {
  expect(swatches().length).toBe(20);
  expect(swatches('dark').length).toBe(17);
  expect(swatches('light').length).toBe(3);
});
