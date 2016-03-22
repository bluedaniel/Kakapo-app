import { expect } from 'chai';
import { camelCase } from 'utils/';

describe('Utility `camelCase`', () => {
  it('`hyphen-name-format` -> `hyphenNameFormat`', () => {
    const setup = camelCase('hyphen-name-format');
    expect(setup).to.eql('hyphenNameFormat');
  });

  it('`hyphenname-format` -> `hyphennameFormat`', () => {
    const setup = camelCase('hyphenname-format');
    expect(setup).to.eql('hyphennameFormat');
  });

  it('`hyphen name format` -> `hyphenNameFormat`', () => {
    const setup = camelCase('hyphen name format');
    expect(setup).to.eql('hyphenNameFormat');
  });

  it('`Hyphen Name Format` -> `hyphenNameFormat`', () => {
    const setup = camelCase('Hyphen Name Format');
    expect(setup).to.eql('hyphenNameFormat');
  });
});
