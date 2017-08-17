import { validHowl } from 'utils/';

test('[utils/validHowl]', () => {
  expect(validHowl('test.invalidExtension')).toBe(false);
  expect(validHowl('test.mp3')).toBe(true);
  expect(validHowl('test.ogg')).toBe(true);
});
