import React from 'react';
import { shallow } from 'enzyme';
import { inc, set, lensProp } from 'ramda';
import { newSoundObj } from 'utils/';
import { SoundList } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<SoundList {...propData} />) };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; inc(i)) {
    const obj = { ...newSoundObj, progress: i > 2 ? 1 : 0.5, editing: i > 2 };
    arr = set(
      lensProp(i),
      Object.keys(obj).reduce((newObj, _e) => {
        newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
        return newObj;
      }, {}),
      arr
    );
  }
  return arr;
}

test('<SoundList/> render empty', () => {
  expect.assertions(1);
  const { wrapper } = setup();
  expect(wrapper.html()).toBe('<div></div>');
});

test('<SoundList/> render', () => {
  expect.assertions(1);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  expect(wrapper.type()).toBe('section');
});

test('<SoundList/> progress === 1', () => {
  expect.assertions(1);
  const { wrapper } = setup({ sounds: randomSounds(8) });
  expect(wrapper.find('.sound-item-wrap').length).toBe(5);
});
