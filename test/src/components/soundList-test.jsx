import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { Map } from 'immutable';
import { getData } from '../helper';
import { newSoundClass } from 'classes/';
import { SoundList } from 'components/';

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
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, progress: i > 2 ? 1 : 0.5, editing: i > 2 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

test('<SoundList/> render empty', t => {
  t.plan(1);
  const { wrapper } = setup();
  t.equals(wrapper.html(), '<div></div>');
});

test('<SoundList/> render', t => {
  t.plan(1);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  t.equals(wrapper.type(), 'section');
});

test('<SoundList/> progress === 1', t => {
  t.plan(1);
  const { wrapper } = setup({ sounds: randomSounds(8) });
  t.equals(wrapper.find('.sound-item-wrap').length, 5);
});
