import React from 'react';
import { map } from 'ramda';
import { newSoundObj } from 'utils/';
import { ImportKakapoItem as KakapoItem } from 'components/';
import { getData, createComponentWithIntl } from '../helper';

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return { sound: map(x => (x === null ? 'wind' : x), obj) };
};

function setup(props = {}) {
  const propData = {
    ...getData('sounds', { full: true }),
    ...props,
  };
  return {
    props,
    tree: createComponentWithIntl(<KakapoItem {...propData} />).toJSON(),
  };
}

test('<KakapoItem/> render', () => {
  const { tree } = setup(soundProp());
  expect(tree).toMatchSnapshot();
});

test('<KakapoItem/> render file', () => {
  const { tree } = setup(soundProp({ file: 'someNewFile' }));
  expect(tree).toMatchSnapshot();
});
