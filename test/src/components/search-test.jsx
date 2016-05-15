import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { getData } from '../../helper';
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

test('<Search/>', t => {
  test('renders as a <div> with className equals `youtube`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equals(wrapper.type(), 'div');
    t.equals(wrapper.prop('className'), 'youtube');
  });

  t.end();
});
