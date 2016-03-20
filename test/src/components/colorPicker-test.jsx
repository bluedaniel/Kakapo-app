/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { ColorPicker } from 'components/ui/';

function setup(props = {}) {
  props = { ...{
    active: false,
    handleSwatch: () => console.log('checkbox changed!')
  }, ...props };
  return { props, wrapper: shallow(<ColorPicker {...props} />) };
}

describe('<ColorPicker/>', () => {
  it('renders as a <div> with className equals `color-picker`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('color-picker');
  });
});
