import { validHowl } from 'utils/';

test('[utils/validHowl]', () => {
  expect.assertions(3);
  expect(validHowl('test.invalidExtension')).toBe(false);
  expect(validHowl('test.mp3')).toBe(true);
  expect(validHowl('test.ogg')).toBe(true);
});
