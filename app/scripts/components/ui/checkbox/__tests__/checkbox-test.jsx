/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Checkbox from '../checkbox';

function setup(enzymeMethod=shallow, props={}) {
  props = { ...{
    checked: false,
    handleChange: () => console.log('checkbox changed!'),
    label: 'testLabel',
    name: 'testName',
    value: 'testValue'
  }, ...props };
  const wrapper = enzymeMethod(<Checkbox {...props} />);
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
      const { wrapper } = setup(mount, {
        handleChange: onInputChange
      });
      wrapper.find('input').simulate('change');
      expect(onInputChange.calledOnce).to.equal(true);
    });
  });
});
