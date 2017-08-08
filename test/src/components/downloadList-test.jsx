import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { inc } from 'ramda';
import { newSoundObj } from 'utils/';
import { DownloadList } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = { ...getData('sounds'), ...props };
  return { props, wrapper: shallow(<DownloadList {...propData} />) };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; inc(i)) {
    const obj = { ...newSoundObj, progress: i > 2 ? 1 : 0.5 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

test('<DownloadList/> render empty', t => {
  t.plan(1);
  const { wrapper } = setup();
  t.equal(wrapper.html(), '<div></div>', 'render empty <div>');
});

test('<DownloadList/> render', t => {
  t.plan(2);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  t.equal(wrapper.type(), 'div', 'render as <div>');
  t.equal(wrapper.prop('className'), 'download-list', 'className `download-list`');
});

test('<DownloadList/> render sounds with `progress` < 1', t => {
  t.plan(1);
  const { wrapper } = setup({ sounds: randomSounds(4) });
  t.equal(wrapper.children().length, 3);
});
