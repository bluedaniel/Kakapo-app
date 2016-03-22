import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Checkbox } from 'components/ui/';

function setup(props = {}) {
  const propData = {
    checked: false,
    dispatch: (e) => e,
    handleChange: () => console.log('checkbox changed!'),
    label: 'testLabel',
    name: 'testName',
    ...props
  };
  return { props, wrapper: shallow(<Checkbox {...propData} />) };
}

describe('<Checkbox/>', () => {
  it('renders as a <label> with className equals `switch`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('label');
    expect(wrapper.prop('className')).to.eql('switch');
  });
});
