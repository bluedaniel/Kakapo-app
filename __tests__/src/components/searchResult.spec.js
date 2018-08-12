import React from 'react';
import { ImportSearchResult as SearchResult } from 'components/';
import { createComponentWithIntl } from '../helper';

const sound = {
  desc: 'Testing description',
  duration: '03:48',
  img: 'https://i.ytimg.com/vi/YTg7fpGLsKE/hqdefault.jpg',
  name: 'Testing name',
  tags: '',
  videoId: 'YTg7fpGLsKE',
  viewCount: 319609,
};

test('<SearchResult/> render youtube', () => {
  const props = {
    service: 'youtube',
    sound,
  };
  const tree = createComponentWithIntl(<SearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SearchResult/> render soundcloud', () => {
  const props = {
    service: 'soundcloud',
    sound,
  };
  const tree = createComponentWithIntl(<SearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
