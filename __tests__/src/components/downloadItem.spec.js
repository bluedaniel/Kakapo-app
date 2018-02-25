import React from 'react';
import renderer from 'react-test-renderer';
import { map } from 'ramda';
import { newSoundObj } from 'utils/';
import { DownloadItem } from 'components/';

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 0.8, ...props };
  return map(x => (x === null ? 'wind' : x), obj);
};

test('<DownloadItem/> render', () => {
  const tree = renderer.create(<DownloadItem sound={soundProp()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<DownloadItem/> w/o image should render `no-image`', () => {
  const tree = renderer
    .create(
      <DownloadItem sound={soundProp({ source: 'youtubeStream', img: '' })} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
