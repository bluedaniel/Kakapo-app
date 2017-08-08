import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Checkbox } from 'components/ui/';

function setup(props = {}) {
  const propData = {
    checked: false,
    dispatch: e => e,
    handleChange: () => console.log('checkbox changed!'),
    label: 'testLabel',
    name: 'testName',
    ...props
  };
  return { props, wrapper: shallow(<Checkbox {...propData} />) };
}

test('<Checkbox/>', t => {
  t.plan(2);
  const { wrapper } = setup();
  t.equals(wrapper.type(), 'label', 'render as <label>');
  t.equals(wrapper.prop('className'), 'switch', 'className `switch`');
});
