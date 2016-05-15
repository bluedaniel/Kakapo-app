import React from 'react';
import test from 'tape';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { getData } from '../../helper';
import { Header } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('settings'),
    ...props
  };
  return { props, wrapper: shallow(<Header {...propData} />) };
}

test('<Header/>', t => {
  test('renders as a <header>', t => {
    t.plan(1);
    const { wrapper } = setup();
    t.equal(wrapper.type(), 'header');
  });

  test('should render mute icon', t => {
    t.plan(1);
    const { wrapper } = setup();
    t.equal(wrapper.find('.toggle-mute').length, 1);
  });

  test('simulate toggle-mute click', t => {
    t.plan(1);
    const toggleMute = sinon.spy();
    const { wrapper } = setup({ toggleMute });
    wrapper.find('.toggle-mute').simulate('click');
    t.equal(toggleMute.calledOnce, true);
  });

  t.end();
});
