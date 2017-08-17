import React from 'react';
import { shallow } from 'enzyme';
import TextInput from 'components/ui/textInput/textInput';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    name: 'test',
    placeholder: 'without.translation',
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<TextInput {...propData} />) };
}

test('<TextInput/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('group');
  expect(wrapper.find('input').length).toBe(1);
  expect(wrapper.find('.highlight').length).toBe(1);
  expect(wrapper.find('.bar').length).toBe(1);
  expect(wrapper.find('label').length).toBe(1);
});

test('<TextInput/> w/o translation', () => {
  const { wrapper } = setup();
  expect(wrapper.find('label').text()).toBe('without.translation');
});

test('<TextInput/> correct value', () => {
  const { wrapper } = setup({ value: 42 });
  expect(wrapper.find('input').props().defaultValue).toBe(42);
});

test('<TextInput/> correct translation', () => {
  const { wrapper } = setup({ placeholder: 'nav.settings' });
  expect(wrapper.find('label').text()).toBe('Settings');
});

test('<TextInput/> loading spinner', () => {
  const { wrapper } = setup({ spinner: true });
  expect(wrapper.find('.spinner').length).toBe(1);
});
