import { expect } from 'chai';
import { compose } from 'utils/';

const minusTwo = x => x - 2;
const plusFour = x => x + 4;
const timesTwo = x => x * 2;

describe('Utility `compose`', () => {
  it('should return a function', () => {
    const setup = compose(timesTwo, plusFour, minusTwo);
    expect(typeof setup).to.eql('function');
  });

  it('should reduce functions right to left', () => {
    const setup = compose(timesTwo, plusFour, minusTwo);
    expect(setup(9)).to.eql(22);
  });
});
