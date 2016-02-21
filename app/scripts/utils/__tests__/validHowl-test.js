/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import validHowl from '../validHowl';

describe('Utility `validHowl`', () => {
  it('rejects `.invalidExtension`', () => {
    const setup = validHowl('test.invalidExtension');
    expect(setup).to.eql(false);
  });

  it('accepts `.mp3`', () => {
    const setup = validHowl('test.mp3');
    expect(setup).to.eql(true);
  });

  it('accepts `.ogg`', () => {
    const setup = validHowl('test.ogg');
    expect(setup).to.eql(true);
  });
});
