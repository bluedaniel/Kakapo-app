import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
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

test('<Nav/> render', t => {
  t.plan(1);
  const { wrapper } = setup();
  t.equals(wrapper.prop('className'), 'topbar');
});
