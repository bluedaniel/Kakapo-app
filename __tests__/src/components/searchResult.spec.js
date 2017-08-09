import React from 'react';
import { shallow } from 'enzyme';
import { contains } from 'ramda';
import { ImportSearchResult as SearchResult } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    service: 'youtube',
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<SearchResult {...propData} />) };
}

const sound = {
  desc: 'Testing description',
  duration: '03:48',
  img: 'https://i.ytimg.com/vi/YTg7fpGLsKE/hqdefault.jpg',
  name: 'Testing name',
  tags: '',
  videoId: 'YTg7fpGLsKE',
  viewCount: 319609
};

test('<SearchResult/> render youtube', () => {
  expect.assertions(2);
  const { wrapper } = setup({ sound });
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('youtube-item');
});

test('<SearchResult/> youtube view count in locale', () => {
  expect.assertions(1);
  const { wrapper } = setup({ sound });
  expect(
    contains(wrapper.find('.view-count').text(), [
      '319609 views',
      '319,609 views'
    ])
  ).toBeTruthy();
});

test('<SearchResult/> render soundcloud', () => {
  expect.assertions(2);
  const { wrapper } = setup({ service: 'soundcloud', sound });
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('soundcloud-item');
});

test('<SearchResult/> soundcould view count in locale', () => {
  expect.assertions(1);
  const { wrapper } = setup({ service: 'soundcloud', sound });
  expect(
    contains(wrapper.find('.view-count').text(), [
      '319609 plays',
      '319,609 plays'
    ])
  ).toBeTruthy();
});
