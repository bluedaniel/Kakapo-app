import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { getData } from '../../helper';
import { Link } from 'react-router';
import { ImportOptions as Options } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Options {...propData} />) };
}

test('<Options/>', t => {
  test('renders as a <div> with className equals `downloads`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equals(wrapper.type(), 'div');
    t.equals(wrapper.prop('className'), 'downloads');
  });

  test('contains 6 links', t => {
    t.plan(1);
    const { wrapper } = setup();
    t.equals(wrapper.find(Link).length, 6);
  });

  test('should render 6 icons', t => {
    t.plan(6);
    const { wrapper } = setup();
    t.equals(wrapper.find('.icon-img-kakapo').length, 1);
    t.equals(wrapper.find('.icon-img-youtube').length, 1);
    t.equals(wrapper.find('.icon-img-soundcloud').length, 1);
    t.equals(wrapper.find('.icon-img-custom').length, 1);
    t.equals(wrapper.find('.icon-settings').length, 1);
    t.equals(wrapper.find('.icon-playlist').length, 1);
  });

  t.end();
});
