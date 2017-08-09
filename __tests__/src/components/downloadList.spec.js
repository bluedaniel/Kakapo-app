import React from 'react';
import { shallow } from 'enzyme';
import { DownloadList } from 'components/';
import { getData, randomSounds } from '../helper';

function setup(props = {}) {
  const propData = { ...getData('sounds'), ...props };
  return { props, wrapper: shallow(<DownloadList {...propData} />) };
}

test('<DownloadList/> render empty', () => {
  expect.assertions(1);
  const { wrapper } = setup();
  expect(wrapper.html()).toBe('<div></div>');
});

test('<DownloadList/> render', () => {
  expect.assertions(2);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('download-list');
});

test('<DownloadList/> render sounds with `progress` < 1', () => {
  expect.assertions(1);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  expect(wrapper.children().length).toBe(3);
});
