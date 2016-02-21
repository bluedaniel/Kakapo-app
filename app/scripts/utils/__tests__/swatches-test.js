/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import swatches from '../swatches';

describe('Utility `swatches`', () => {
  it('returns 20 colors in array', () => {
    const setup = swatches.all();
    expect(setup.length).to.eql(20);
  });

  it('returns 17 dark colors in array', () => {
    const setup = swatches.dark;
    expect(setup.length).to.eql(17);
  });

  it('returns 3 light colors in array', () => {
    const setup = swatches.light;
    expect(setup.length).to.eql(3);
  });
});
