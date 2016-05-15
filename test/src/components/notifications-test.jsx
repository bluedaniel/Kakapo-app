import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { Map } from 'immutable';
import { Notifications } from 'components/ui/';

function setup(props = {}) {
  return { props, wrapper: shallow(<Notifications {...props} />) };
}

test('<Notifications/>', t => {
  test('renders as a <aside> with className equals `notify`', t => {
    t.plan(2);
    const { wrapper } = setup({ notifications: new Map() });
    t.equals(wrapper.type(), 'aside');
    t.equals(wrapper.prop('className'), 'notify');
  });

  test('When given props', t => {
    test('className is correct', t => {
      t.plan(1);
      const { wrapper } = setup({ notifications: new Map({ a: 'test' }) });
      t.equals(wrapper.prop('className'), 'notify notify-visible');
    });

    test('renders list in correct order', t => {
      t.plan(3);
      const { wrapper } = setup({ notifications: new Map({ a: 'test', b: 'test2' }) });
      t.equals(wrapper.children().length, 2);
      t.equals(wrapper.childAt(0).text(), 'test');
      t.equals(wrapper.childAt(1).text(), 'test2');
    });

    t.end();
  });

  t.end();
});
