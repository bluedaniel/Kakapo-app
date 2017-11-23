import React from 'react';
import renderer from 'react-test-renderer';
import { map } from 'ramda';
import { newSoundObj } from 'utils/';
import { ImportKakapoItem as KakapoItem } from 'components/';
import { getData } from '../helper';

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return { sound: map(x => (x === null ? 'wind' : x), obj) };
};

function setup(props = {}) {
  const propData = {
    ...getData('sounds', { full: true }),
    ...getData('intl'),
    ...props
  };
  return {
    props,
    tree: renderer.create(<KakapoItem {...propData} />).toJSON()
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
