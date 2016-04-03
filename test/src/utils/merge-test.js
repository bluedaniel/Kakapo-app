import { expect } from 'chai';
import { merge } from 'utils/';

describe('Utility `merge`', () => {
  it('takes two objects, merges their own properties and returns a new object', () => {
    const setup = merge({ w: 1, x: 2 }, { y: 3, z: 4 });
    expect(setup).to.eql({ w: 1, x: 2, y: 3, z: 4 });
  });

  it('takes two objects, merges their own properties and returns a new object', () => {
    const setup = merge({ w: 1, x: 2 }, { w: 100, y: 3, z: 4 });
    expect(setup).to.eql({ w: 1, x: 2, y: 3, z: 4 });
  });
});
