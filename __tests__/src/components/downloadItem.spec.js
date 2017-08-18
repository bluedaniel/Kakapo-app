import React from 'react';
import renderer from 'react-test-renderer';
import { newSoundObj } from 'utils/';
import { DownloadItem } from 'components/';

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 0.8, ...props };
  return Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {});
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
