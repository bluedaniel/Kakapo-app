import test from 'tape';
import { camelCase } from 'utils/';

test('[utils/camelCase]', t => {
  t.plan(4);
  t.equal(camelCase('hyphen-name-format'), 'hyphenNameFormat', 'should be valid');
  t.equal(camelCase('hyphenname-format'), 'hyphennameFormat', 'should be valid');
  t.equal(camelCase('hyphen name format'), 'hyphenNameFormat', 'should be valid');
  t.equal(camelCase('Hyphen Name Format'), 'hyphenNameFormat', 'should be valid');
});
