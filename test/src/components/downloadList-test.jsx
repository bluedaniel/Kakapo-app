import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { getData } from '../../helper';
import { newSoundClass } from 'classes/';
import { DownloadList } from 'components/';

function setup(props = {}) {
  const propData = { ...getData('sounds'), ...props };
  return { props, wrapper: shallow(<DownloadList {...propData} />) };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, progress: i > 2 ? 1 : 0.5 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

test('<DownloadList/>', t => {
  test('renders empty div if no downloads', t => {
    t.plan(1);
    const { wrapper } = setup();
    t.equal(wrapper.html(), '<div></div>');
  });

  test('When given props', t => {
    test('renders as a <div> with className equals `download-list`', t => {
      t.plan(2);
      const { wrapper } = setup({ sounds: randomSounds(4) });
      t.equal(wrapper.type(), 'div');
      t.equal(wrapper.prop('className'), 'download-list');
    });

    test('should only render sounds with `progress` < 1', t => {
      t.plan(1);
      const { wrapper } = setup({ sounds: randomSounds(4) });
      t.equal(wrapper.children().length, 3);
    });

    t.end();
  });

  t.end();
});
