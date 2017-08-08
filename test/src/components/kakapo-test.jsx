import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { inc, set, lensProp, identity } from 'ramda';
import { newSoundObj } from 'utils/';
import { ImportKakapo as Kakapo, ImportKakapoItem as KakapoItem } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    ...getData('intl'),
    dispatch: identity,
    ...props
  };
  return { props, wrapper: shallow(<Kakapo {...propData} />) };
}

function randomSounds(count) {
  let arr = [];
  for (let i = 0; i < count; inc(i)) {
    const obj = { ...newSoundObj, source: 'file', progress: 1 };
    arr = set(lensProp(i), Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = typeof obj[_e] === 'function' ? `test${i}` : obj[_e];
      return newObj;
    }, {}), arr);
  }
  return arr;
}

test('<Kakapo/> render', t => {
  t.plan(2);
  const { wrapper } = setup();
  t.equal(wrapper.type(), 'div', 'render as <div>');
  t.equal(wrapper.prop('className'), 'kakapo', 'className `kakapo`');
});

test('<Kakapo/> render items', t => {
  t.plan(1);
  const { wrapper } = setup({ search: fromJS({ kakapofavs: randomSounds(5) }) });
  t.equal(wrapper.find(KakapoItem).length, 5);
});
