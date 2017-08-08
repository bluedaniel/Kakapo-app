import React from 'react';
import { shallow } from 'enzyme';
import { newSoundObj } from 'utils/';
import { DownloadItem } from 'components/';

function setup(props = {}) {
  return { props, wrapper: shallow(<DownloadItem sound={props} />).shallow() };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 0.8, ...props };
  return Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {});
};

test('<DownloadItem/> render', () => {
  expect.assertions(2);
  const { wrapper } = setup(soundProp());
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('download active');
});

test('<DownloadItem/> w/o image should render `no-image`', () => {
  expect.assertions(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
  expect(wrapper.find('.no-image').length).toBe(1);
});
