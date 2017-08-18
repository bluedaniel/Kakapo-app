import React from 'react';
import renderer from 'react-test-renderer';
import { DownloadList } from 'components/';
import { getData, randomSounds } from '../helper';

test('<DownloadList/> render empty', () => {
  const props = { ...getData('sounds') };
  const tree = renderer.create(<DownloadList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<DownloadList/> render', () => {
  const props = { ...getData('sounds'), sounds: randomSounds(4) };
  const tree = renderer.create(<DownloadList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<DownloadList/> render sounds with `progress` < 1', () => {
  const props = { ...getData('sounds'), sounds: randomSounds(4) };
  const tree = renderer.create(<DownloadList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
