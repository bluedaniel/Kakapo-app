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

test('<TextInput/> render', t => {
  t.plan(6);
  const { wrapper } = setup();
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), 'group');
  t.equals(wrapper.find('input').length, 1);
  t.equals(wrapper.find('.highlight').length, 1);
  t.equals(wrapper.find('.bar').length, 1);
  t.equals(wrapper.find('label').length, 1);
});

test('<TextInput/> w/o translation', t => {
  t.plan(1);
  const { wrapper } = setup();
  t.equals(wrapper.find('label').text(), 'without.translation');
});

test('<TextInput/> correct value', t => {
  t.plan(1);
  const { wrapper } = setup({ value: 42 });
  t.equals(wrapper.find('input').props().defaultValue, 42);
});

test('<TextInput/> correct translation', t => {
  t.plan(1);
  const { wrapper } = setup({ placeholder: 'nav.settings' });
  t.equals(wrapper.find('label').text(), 'Settings');
});

test('<TextInput/> loading spinner', t => {
  t.plan(1);
  const { wrapper } = setup({ spinner: true });
  t.equals(wrapper.find('.spinner').length, 1);
});
