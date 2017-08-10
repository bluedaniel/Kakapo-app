import React from 'react';
import { shallow } from 'enzyme';
import ColorPicker from 'components/ui/colorPicker/colorPicker';

function setup(props = {}) {
  props = {
    ...{
      active: false,
      handleSwatch: () => 'checkbox changed!'
    },
    ...props
  };
  return { props, wrapper: shallow(<ColorPicker {...props} />) };
}

test('<ColorPicker/>', () => {
  expect.assertions(2);
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('color-picker');
});
