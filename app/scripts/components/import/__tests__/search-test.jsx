/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { getData } from '__tests__/helper';
import Search from '../search';

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

  it('call componentDidMount', () => {
    spy(Search.prototype, 'componentDidMount');
    setup({}, mount);
    expect(Search.prototype.componentDidMount.calledOnce).to.eql(true);
    Search.prototype.componentDidMount.restore();
  });

  it('contains correct refs and state for youtube', () => {
    const { wrapper } = setup({}, mount);
    expect(wrapper.ref('searchInput').length).to.equal(1);
    expect(wrapper.state()).to.eql({ service: 'youtube', loading: false });
  });

  it('contains correct refs and state for soundcloud', () => {
    const { wrapper } = setup({ location: { pathname: '/soundcloud' } }, mount);
    expect(wrapper.ref('searchInput').length).to.equal(1);
    expect(wrapper.state()).to.eql({ service: 'soundcloud', loading: false });
  });
});
