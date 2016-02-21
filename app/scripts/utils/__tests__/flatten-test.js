/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import { flatten, flatteni18n } from '../flatten';

describe('Utility `flatten`', () => {
  it('returns an already flat array', () => {
    const setup = flatten([ 1, 2, 3, 4, 5 ]);
    expect(setup).to.eql([ 1, 2, 3, 4, 5 ]);
  });

  it('flattens multi-dimensional array', () => {
    const setup = flatten([ 1, [ 2, [ 3, [ 4 ] ], 5 ] ]);
    expect(setup).to.eql([ 1, 2, 3, 4, 5 ]);
  });
});

describe('Utility `flatteni18n`', () => {
  it('flattens object to key/value with full paths', () => {
    const setup = flatteni18n({ a: { b: { b2: 2 }, c: { c2: 2 } } });
    expect(setup).to.eql({ 'a.b.b2': 2, 'a.c.c2': 2 });
  });
});
