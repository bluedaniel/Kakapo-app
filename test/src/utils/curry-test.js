import { expect } from 'chai';
import { curry } from 'utils/';

describe('Utility `curry`', () => {
  it('should return a function', () => {
    const setup = curry((x, y, z) => (x * y) + z);
    expect(typeof setup).to.eql('function');
  });

  it('should curry arguments left to right', () => {
    const setup = curry((x, y, z) => (x * y) + z);
    expect(setup(1)(2)(3)).to.eql(5);
  });
});
