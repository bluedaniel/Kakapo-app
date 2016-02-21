/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import createConstants from '../createConstants';

describe('Utility `createConstants`', () => {
  it('returns key/value object', () => {
    const setup = createConstants('TEST1', 'TEST2', 'TEST3');
    expect(setup).to.eql({ TEST1: 'TEST1', TEST2: 'TEST2', TEST3: 'TEST3' });
  });
});
