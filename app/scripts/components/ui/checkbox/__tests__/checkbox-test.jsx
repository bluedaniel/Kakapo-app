/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Checkbox from '../checkbox';

function setup(props = {}, enzymeMethod = shallow) {
  const propData = {
    checked: false,
    dispatch: (e) => e,
    handleChange: () => console.log('checkbox changed!'),
    label: 'testLabel',
    name: 'testName',
    ...props
  };
  const wrapper = enzymeMethod(<Checkbox {...propData}/>);
  return {
    props,
    wrapper
  };
}

describe('<Checkbox/>', () => {
  it('renders as a <label> with className equals `switch`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('label');
    expect(wrapper.prop('className')).to.eql('switch');
  });

  describe('When changed', () => {
    it('triggers handleChange fn', () => {
      const onInputChange = sinon.spy();
      const { wrapper } = setup({
        handleChange: onInputChange
      }, mount);
      wrapper.find('input').simulate('change');
      expect(onInputChange.calledOnce).to.equal(true);
    });
  });
});
