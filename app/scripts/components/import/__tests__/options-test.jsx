/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '__tests__/helper';
import { Link } from 'react-router';
import Options from '../options';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...props
  };
  const wrapper = shallow(<Options {...propData}/>);
  return {
    props,
    wrapper
  };
}

describe('<Options/>', () => {
  it('renders as a <div> with className equals `modal-inner media`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql(`modal downloads`);
  });

  it('contains 4 links', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Link)).to.have.length(4);
  });

  it('should render 4 icons', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.icon-kakapo')).to.have.length(1);
    expect(wrapper.find('.icon-youtube')).to.have.length(1);
    expect(wrapper.find('.icon-soundcloud')).to.have.length(1);
    expect(wrapper.find('.icon-custom')).to.have.length(1);
  });
});
