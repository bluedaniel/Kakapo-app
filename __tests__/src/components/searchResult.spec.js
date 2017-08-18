import React from 'react';
import renderer from 'react-test-renderer';
import { ImportSearchResult as SearchResult } from 'components/';
import { getData } from '../helper';

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
  const props = {
    service: 'youtube',
    ...getData('intl'),
    sound
  };
  const tree = renderer.create(<SearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SearchResult/> render soundcloud', () => {
  const props = {
    service: 'soundcloud',
    ...getData('intl'),
    sound
  };
  const tree = renderer.create(<SearchResult {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
