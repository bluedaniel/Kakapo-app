import { expect } from 'chai';
import { noop } from 'utils/';

describe('Utility `noop`', () => {
  it('should return undefined', () => {
    const setup = noop();
    expect(setup).to.eql(undefined);
  });
});
