import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { ImportOptions as Options } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Options {...propData} />) };
}

test('<Options/> render', () => {
  expect.assertions(2);
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('downloads');
});

test('<Options/> contains 6 links', () => {
  expect.assertions(1);
  const { wrapper } = setup();
  expect(wrapper.find(Link).length).toBe(6);
});

test('<Options/> render 6 icons', () => {
  expect.assertions(6);
  const { wrapper } = setup();
  expect(wrapper.find('.icon-img-kakapo').length).toBe(1);
  expect(wrapper.find('.icon-img-youtube').length).toBe(1);
  expect(wrapper.find('.icon-img-soundcloud').length).toBe(1);
  expect(wrapper.find('.icon-img-custom').length).toBe(1);
  expect(wrapper.find('.icon-settings').length).toBe(1);
  expect(wrapper.find('.icon-playlist').length).toBe(1);
});
