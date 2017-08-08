import React from 'react';
import { shallow } from 'enzyme';
import { getData } from '../helper';
import { ImportCustomUrl as CustomUrl } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...getData('themes'),
    ...props
  };
  return { props, wrapper: shallow(<CustomUrl {...propData} />) };
}

test('<CustomUrl/>', () => {
  expect.assertions(2);
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('customurl');
});
