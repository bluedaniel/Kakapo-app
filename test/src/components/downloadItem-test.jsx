import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { newSoundClass } from 'classes/';
import { DownloadItem } from 'components/';

function setup(props = {}) {
  return { props, wrapper: shallow(<DownloadItem sound={props} />).shallow() };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 0.8, ...props };
  return Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {});
};

test('<DownloadItem/> render', t => {
  t.plan(2);
  const { wrapper } = setup(soundProp());
  t.equal(wrapper.type(), 'div', 'render as <div>');
  t.equal(wrapper.prop('className'), 'download active');
});

test('<DownloadItem/> w/o image should render `no-image`', t => {
  t.plan(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
  t.equal(wrapper.find('.no-image').length, 1, 'should render `no-image`');
});
