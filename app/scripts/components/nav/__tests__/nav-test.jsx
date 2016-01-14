/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getReduxStore, getReactIntlContext } from '__tests__/helper';
import Nav from '../nav';

function setup(props={}) {
  const wrapper = shallow(<Nav {...props} store={getReduxStore()}/>, {
    context: getReactIntlContext()
  }).shallow().shallow();
  return {
    props,
    wrapper
  };
}

describe('<Nav/>', () => {
  it('className equals `topbar`', () => {
    const { wrapper } = setup();
    expect(wrapper.prop('className')).to.eql('topbar');
  });
});
