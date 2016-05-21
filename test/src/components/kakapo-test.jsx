import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { getData } from '../helper';
import { newSoundClass } from 'classes/';
import { ImportKakapo as Kakapo, ImportKakapoItem as KakapoItem } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    ...getData('intl'),
    dispatch: (e) => e,
    ...props
  };
  return { props, wrapper: shallow(<Kakapo {...propData} />) };
}

function randomSounds(count) {
  let arr = new List();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, source: 'file', progress: 1 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = typeof obj[_e] === 'function' ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
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
