import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { ColorPicker } from 'components/ui/';

function setup(props = {}) {
  props = { ...{
    active: false,
    handleSwatch: () => console.log('checkbox changed!')
  }, ...props };
  return { props, wrapper: shallow(<ColorPicker {...props} />) };
}

test('<ColorPicker/>', t => {
  test('renders as a <div> with className equals `color-picker`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equal(wrapper.type(), 'div');
    t.equal(wrapper.prop('className'), 'color-picker');
  });

  t.end();
});
