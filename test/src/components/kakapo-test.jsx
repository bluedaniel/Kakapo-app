import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { getData } from '../../helper';
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

test('<Kakapo/>', t => {
  test('renders as a <div> with className equals `kakapo`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equal(wrapper.type(), 'div');
    t.equal(wrapper.prop('className'), 'kakapo');
  });

  test('renders correct number of SoudCloud items', t => {
    t.plan(1);
    const { wrapper } = setup({ search: fromJS({ kakapofavs: randomSounds(5) }) });
    t.equal(wrapper.find(KakapoItem).length, 5);
  });

  test('When mounted', t => {
    // it.skip('focus on input should change state', t => {
    //   t.plan(1);
    //   const { wrapper } = setup();
    //   wrapper.find('.input__field').simulate('focus');
    //   t.equal(wrapper.state('focused'), 'input-yt');
    // });
    //
    // it.skip('should subscribe to RxJS autocomplete stream', t => {
    //
    // });

    t.end();
  });

  t.end();
});
