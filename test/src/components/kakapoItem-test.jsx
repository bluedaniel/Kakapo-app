import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { newSoundClass } from 'classes/';
import { getData } from '../../helper';
import { ImportKakapoItem as KakapoItem } from 'components/';

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 1, ...props };
  return { sound: Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {}) };
};

function setup(props = {}) {
  const propData = {
    ...getData('sounds', { full: true }),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<KakapoItem {...propData} />) };
}

test('<KakapoItem/>', t => {
  test('renders as a <div> with className equals `kakapo-item disabled`', t => {
    t.plan(2);
    const { wrapper } = setup(soundProp());
    t.equal(wrapper.type(), 'div');
    t.equal(wrapper.prop('className'), 'kakapo-item disabled');
  });

  test('when given unique file renders className equals `kakapo-item`', t => {
    t.plan(2);
    const { wrapper } = setup(soundProp({ file: 'someNewFile' }));
    t.equal(wrapper.type(), 'div');
    t.equal(wrapper.prop('className'), 'kakapo-item');
  });

  t.end();
});
