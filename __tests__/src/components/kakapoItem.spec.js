import React from 'react';
import { shallow } from 'enzyme';
import { newSoundObj } from 'utils/';
import { ImportKakapoItem as KakapoItem } from 'components/';
import { getData } from '../helper';

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return {
    sound: Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
      return newObj;
    }, {})
  };
};

function setup(props = {}) {
  const propData = {
    ...getData('sounds', { full: true }),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<KakapoItem {...propData} />) };
}

test('<KakapoItem/> render', () => {
  const { wrapper } = setup(soundProp());
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('kakapo-item disabled');
});

test('<KakapoItem/> render file', () => {
  const { wrapper } = setup(soundProp({ file: 'someNewFile' }));
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('kakapo-item');
});
