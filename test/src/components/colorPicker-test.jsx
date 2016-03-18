/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { ColorPicker } from 'components/ui/';

function setup(enzymeMethod = shallow, props = {}) {
  props = { ...{
    active: false,
    handleSwatch: () => console.log('checkbox changed!')
  }, ...props };
  const wrapper = enzymeMethod(<ColorPicker {...props} />);
  return {
    props,
    wrapper
  };
}

describe('<ColorPicker/>', () => {
  it('renders as a <div> with className equals `color-picker`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('color-picker');
  });

  describe('When clicked', () => {
    it('first item returns `#FFEB3B`', () => {
      const onInputChange = sinon.spy();
      const { wrapper } = setup(mount, {
        handleSwatch: onInputChange
      });
      wrapper.children().first().simulate('click');
      expect(onInputChange.calledOnce).to.equal(true);
      expect(onInputChange.calledWith('#FFEB3B')).to.equal(true);
    });

    it('last item returns `#001`', () => {
      const onInputChange = sinon.spy();
      const { wrapper } = setup(mount, {
        handleSwatch: onInputChange
      });
      wrapper.children().last().simulate('click');
      expect(onInputChange.calledOnce).to.equal(true);
      expect(onInputChange.calledWith('#001')).to.equal(true);
    });
  });
});
