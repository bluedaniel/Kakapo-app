import { camelCase } from 'utils/';

test('[utils/camelCase]', () => {
  expect.assertions(4);
  expect(camelCase('hyphen-name-format')).toBe('hyphenNameFormat');
  expect(camelCase('hyphenname-format')).toBe('hyphennameFormat');
  expect(camelCase('hyphen name format')).toBe('hyphenNameFormat');
  expect(camelCase('Hyphen Name Format')).toBe('hyphenNameFormat');
});
