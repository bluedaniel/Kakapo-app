/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import { classNames } from 'utils/';

describe('Utility `classNames`', () => {
  it('takes multiple arguments', () => {
    const setup = classNames('one', 'two', 'three');
    expect(setup).to.eql('one two three');
  });

  it('takes array as arguments', () => {
    const setup = classNames([ 'one', 'two' ]);
    expect(setup).to.eql('one two');
  });

  it('takes multi-dimensional array as arguments', () => {
    const setup = classNames([ 'one', 'two', [ 'three' ] ]);
    expect(setup).to.eql('one two three');
  });

  it('takes object as arguments', () => {
    const setup = classNames('one', { two: true, three: false });
    expect(setup).to.eql('one two');
  });
});
