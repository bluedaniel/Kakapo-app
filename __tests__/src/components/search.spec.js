import React from 'react';
import { shallow } from 'enzyme';
import { getData } from '../helper';
import { ImportSearch as Search } from 'components/';

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
  expect.assertions(2);
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('youtube');
});
