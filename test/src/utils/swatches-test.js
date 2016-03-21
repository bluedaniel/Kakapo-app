import { expect } from 'chai';
import { swatches } from 'utils/';

describe('Utility `swatches`', () => {
  it('returns 20 colors in array', () => {
    const setup = swatches();
    expect(setup.length).to.eql(20);
  });

  it('returns 17 dark colors in array', () => {
    const setup = swatches('dark');
    expect(setup.length).to.eql(17);
  });

  it('returns 3 light colors in array', () => {
    const setup = swatches('light');
    expect(setup.length).to.eql(3);
  });
});
