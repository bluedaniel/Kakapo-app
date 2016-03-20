/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { ImportSearch as Search } from 'components/';

function setup(props = {}, method = shallow) {
  const propData = {
    location: { pathname: '/youtube' },
    ...getData('intl'),
    ...getData('search'),
    ...props
  };
  const wrapper = method(<Search {...propData} />);
  return {
    props,
    wrapper
  };
}

describe('<Search/>', () => {
  it('renders as a <div> with className equals `youtube`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('youtube');
  });
});
