import React from 'react';
import { shallow } from 'enzyme';
import { SoundList } from 'components/';
import { getData, randomSounds } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<SoundList {...propData} />) };
}

test('<SoundList/> render empty', () => {
  const { wrapper } = setup();
  expect(wrapper.html()).toBe('<div></div>');
});

test('<SoundList/> render', () => {
  const { wrapper } = setup({ sounds: randomSounds(4) });
  expect(wrapper.type()).toBe('section');
});

test('<SoundList/> progress === 1', () => {
  const { wrapper } = setup({ sounds: randomSounds(8) });
  expect(wrapper.find('.sound-item-wrap').length).toBe(5);
});
