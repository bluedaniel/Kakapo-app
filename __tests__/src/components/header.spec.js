import React from 'react';
import { shallow } from 'enzyme';
import { Header } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('settings'),
    ...props
  };
  return { props, wrapper: shallow(<Header {...propData} />) };
}

test('<Header/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('header');
});

test('<Header/> render mute icon', () => {
  const { wrapper } = setup();
  expect(wrapper.find('.toggle-mute').length).toBe(1);
});

test('<Header/> simulate toggle-mute click', () => {
  const onToggleMute = jest.fn();
  const { wrapper } = setup({ onToggleMute });
  wrapper.find('.toggle-mute').simulate('click');
  expect(onToggleMute).toBeCalled();
});
