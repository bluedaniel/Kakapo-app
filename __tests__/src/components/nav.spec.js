import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Nav {...propData} />) };
}

test('<Nav/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.prop('className')).toBe('topbar');
});
