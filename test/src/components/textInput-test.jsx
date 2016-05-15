import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { getData } from '../../helper';
import { TextInput } from 'components/ui/';

function setup(props = {}) {
  const propData = {
    name: 'test',
    placeholder: 'without.translation',
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<TextInput {...propData} />) };
}

test('<TextInput/>', t => {
  test('renders as a <div> with className equals `group`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equals(wrapper.type(), 'div');
    t.equals(wrapper.prop('className'), 'group');
  });

  test('renders the correct amount of elements', t => {
    t.plan(4);
    const { wrapper } = setup();
    t.equals(wrapper.find('input').length, 1);
    t.equals(wrapper.find('.highlight').length, 1);
    t.equals(wrapper.find('.bar').length, 1);
    t.equals(wrapper.find('label').length, 1);
  });

  test('renders correctly without translation', t => {
    t.plan(1);
    const { wrapper } = setup();
    t.equals(wrapper.find('label').text(), 'without.translation');
  });

  test('When given props', t => {
    test('renders the correct value', t => {
      t.plan(1);
      const { wrapper } = setup({ value: 42 });
      t.equals(wrapper.find('input').props().defaultValue, 42);
    });

    test('renders the correct translation', t => {
      t.plan(1);
      const { wrapper } = setup({ placeholder: 'nav.settings' });
      t.equals(wrapper.find('label').text(), 'Settings');
    });

    test('renders a loading spinner', t => {
      t.plan(1);
      const { wrapper } = setup({ spinner: true });
      t.equals(wrapper.find('.spinner').length, 1);
    });

    t.end();
  });

  t.end();
});
