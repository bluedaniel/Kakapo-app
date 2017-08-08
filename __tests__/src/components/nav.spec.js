import React from 'react';
import { shallow } from 'enzyme';
import { getData } from '../helper';
import { Nav } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Nav {...propData} />) };
}

test('<Nav/> render', () => {
  expect.assertions(1);
  const { wrapper } = setup();
  expect(wrapper.prop('className')).toBe('topbar');
});
