import React from 'react';
import renderer from 'react-test-renderer';
import Notifications from 'components/ui/notifications/notifications';

function setup(props = {}) {
  return {
    props,
    tree: renderer.create(<Notifications {...props} />).toJSON(),
  };
}

test('<Notifications/> render', () => {
  const { tree } = setup({ notifications: {} });
  expect(tree).toMatchSnapshot();
});

test('<Notifications/> className', () => {
  const { tree } = setup({ notifications: { a: 'test' } });
  expect(tree).toMatchSnapshot();
});

test('<Notifications/> list order', () => {
  const { tree } = setup({ notifications: { a: 'test', b: 'test2' } });
  expect(tree).toMatchSnapshot();
});
