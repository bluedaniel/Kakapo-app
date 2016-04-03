import { expect } from 'chai';
import { safe } from 'utils/';

describe('Utility `safe`', () => {
  it('should return the return value of the supplied function if it is safe', () => {
    const setup = safe(() => 'hello');
    expect(setup).to.eql('hello');
  });

  it('should return undefined if the function throws an error and no alternative is provided', () => {
    const setup = safe(() => foo);
    expect(setup).to.eql(undefined);
  });

  it('should return the alternative provided if the function throws an error', () => {
    const setup = safe(() => bar, 'baz');
    expect(setup).to.eql('baz');
  });
});
