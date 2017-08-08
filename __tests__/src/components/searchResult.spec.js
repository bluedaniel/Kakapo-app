import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import R from 'ramda';
import { getData } from '../helper';
import { ImportSearchResult as SearchResult } from 'components/';

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

test('<SearchResult/> render youtube', t => {
  t.plan(2);
  const { wrapper } = setup({ sound });
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), 'youtube-item');
});

test('<SearchResult/> youtube view count in locale', t => {
  t.plan(1);
  const { wrapper } = setup({ sound });
  t.ok(
    R.contains(wrapper.find('.view-count').text(), [
      '319609 views',
      '319,609 views'
    ])
  );
});

test('<SearchResult/> render soundcloud', t => {
  t.plan(2);
  const { wrapper } = setup({ service: 'soundcloud', sound });
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), 'soundcloud-item');
});

test('<SearchResult/> soundcould view count in locale', t => {
  t.plan(1);
  const { wrapper } = setup({ service: 'soundcloud', sound });
  t.ok(
    R.contains(wrapper.find('.view-count').text(), [
      '319609 plays',
      '319,609 plays'
    ])
  );
});
