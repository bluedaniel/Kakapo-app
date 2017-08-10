import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from 'components/ui/checkbox/checkbox';

function setup(props = {}) {
  const propData = {
    checked: false,
    dispatch: e => e,
    handleChange: () => 'checkbox changed!',
    label: 'testLabel',
    name: 'testName',
    ...props
  };
  return { props, wrapper: shallow(<Checkbox {...propData} />) };
}

test('<Checkbox/>', () => {
  expect.assertions(2);
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('label');
  expect(wrapper.prop('className')).toBe('switch');
});
