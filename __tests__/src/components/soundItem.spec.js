import React from 'react';
import { shallow } from 'enzyme';
import { newSoundObj } from 'utils/';
import { SoundItem } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  return { props, wrapper: shallow(<SoundItem {...propData} />) };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return {
    sound: Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
      return newObj;
    }, {})
  };
};

const defaultClassName = 'item waves-effect waves-block';
const youtubeTestId = '7ccQyyCLtx8';

test('<SoundItem/> render', () => {
  expect.assertions(2);
  const { wrapper } = setup(soundProp());
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe(`${defaultClassName} paused`);
});

test('<SoundItem/> w/o image', () => {
  expect.assertions(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
  expect(wrapper.find('.no-image').length).toBe(1);
});

test('<SoundItem/> render 3 icons', () => {
  expect.assertions(3);
  const { wrapper } = setup(soundProp());
  expect(wrapper.find('.icon-share').length).toBe(1);
  expect(wrapper.find('.icon-edit').length).toBe(1);
  expect(wrapper.find('.icon-delete').length).toBe(1);
});

test('<SoundItem/> youtube render', () => {
  expect.assertions(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  expect(wrapper.prop('className')).toBe(
    `${defaultClassName} paused youtube-stream`
  );
});

test('<SoundItem/> youtube render 2 icons', () => {
  expect.assertions(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  expect(wrapper.find('.icon-edit').length).toBe(0);
});

test('<SoundItem/> youtube render test-id', () => {
  expect.assertions(2);
  const { wrapper } = setup(
    soundProp({ file: youtubeTestId, source: 'youtubeStream' })
  );
  expect(wrapper.find('.youtube-video').length).toBe(1);
  expect(wrapper.find('.youtube-video').prop('id')).toBe(
    `video-${youtubeTestId}`
  );
});

test('<SoundItem/> render playing', () => {
  expect.assertions(1);
  const { wrapper } = setup(soundProp({ playing: true }));
  expect(wrapper.prop('className')).toBe(`${defaultClassName} playing`);
});
