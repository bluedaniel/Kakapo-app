import React from 'react';
import { shallow } from 'enzyme';
import Notifications from 'components/ui/notifications/notifications';

function setup(props = {}) {
  return { props, wrapper: shallow(<Notifications {...props} />) };
}

test('<Notifications/> render', () => {
  expect.assertions(2);
  const { wrapper } = setup({ notifications: {} });
  expect(wrapper.type()).toBe('aside');
  expect(wrapper.prop('className')).toBe('notify');
});

test('<Notifications/> className', () => {
  expect.assertions(1);
  const { wrapper } = setup({ notifications: { a: 'test' } });
  expect(wrapper.prop('className')).toBe('notify notify-visible');
});

test('<Notifications/> list order', () => {
  expect.assertions(3);
  const { wrapper } = setup({ notifications: { a: 'test', b: 'test2' } });
  expect(wrapper.children().length).toBe(2);
  expect(wrapper.childAt(0).text()).toBe('test');
  expect(wrapper.childAt(1).text()).toBe('test2');
});
