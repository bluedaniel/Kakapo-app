import React from 'react';
import { shallow } from 'enzyme';
import { ImportSearch as Search } from 'components/';
import { getData } from '../helper';

function setup(props = {}, method = shallow) {
  const propData = {
    location: { pathname: '/youtube' },
    ...getData('intl'),
    ...getData('search'),
    ...props
  };
  const wrapper = method(<Search {...propData} />);
  return {
    props,
    wrapper
  };
}

test('<Search/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('youtube');
});
