import { expect } from 'chai';
import { omit } from 'utils/';

describe('Utility `omit`', () => {
  it('remove `foo`', () => {
    const setup = omit('foo', { foo: 2, bar: 1, baz: 4, boo: false });
    expect(setup).to.eql({ bar: 1, baz: 4, boo: false });
  });

  it('remove `boo` & `bar`', () => {
    const setup = omit([ 'bar', 'boo', 'beam' ], { foo: 2, bar: 1, baz: 4, boo: false });
    expect(setup).to.eql({ foo: 2, baz: 4 });
  });
});
