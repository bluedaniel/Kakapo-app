import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { Header } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('settings'),
    ...props
  };
  return { props, wrapper: shallow(<Header {...propData} />) };
}

describe('<Header/>', () => {
  it('renders as a <header>', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('header');
  });

  it('should render mute icon', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.toggle-mute')).to.have.length(1);
  });

  it('simulate toggle-mute click', () => {
    const toggleMute = sinon.spy();
    const { wrapper } = setup({ toggleMute });
    wrapper.find('.toggle-mute').simulate('click');
    expect(toggleMute.calledOnce).to.equal(true);
  });
});
