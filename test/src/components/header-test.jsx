/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { Header } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('settings'),
    dispatch: (e) => e,
    ...props
  };
  const wrapper = shallow(<Header {...propData} />);
  return {
    props,
    wrapper
  };
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
});
