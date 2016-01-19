/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getReactIntlContext } from '__tests__/helper';
import Options from '../options';
import { Link } from 'react-router';

function setup(props={}) {
  const wrapper = shallow(<Options/>, {
    context: getReactIntlContext()
  }).shallow();
  return {
    props,
    wrapper
  };
}

describe('<Options/>', () => {
  it('renders as a <div> with className equals `modal-inner media`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql(`modal-inner media`);
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
    expect(wrapper.find('.icon-file')).to.have.length(1);
  });
});
