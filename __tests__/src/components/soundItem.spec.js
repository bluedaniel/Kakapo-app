import React from 'react';
import renderer from 'react-test-renderer';
import { newSoundObj } from 'utils/';
import { SoundItem } from 'components/';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  return { props, tree: renderer.create(<SoundItem {...propData} />).toJSON() };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return {
    sound: Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
      return newObj;
    }, {})
  };
};

test('<SoundItem/> render', () => {
  const { tree } = setup(soundProp());
  expect(tree).toMatchSnapshot();
});

test('<SoundItem/> w/o image', () => {
  const { tree } = setup(soundProp({ source: 'youtubeStream', img: '' }));
  expect(tree).toMatchSnapshot();
});

test('<SoundItem/> youtube render', () => {
  const { tree } = setup(soundProp({ source: 'youtubeStream' }));
  expect(tree).toMatchSnapshot();
});

test('<SoundItem/> youtube render test-id', () => {
  const { tree } = setup(
    soundProp({ file: '7ccQyyCLtx8', source: 'youtubeStream' })
  );
  expect(tree).toMatchSnapshot();
});

test('<SoundItem/> render playing', () => {
  const { tree } = setup(soundProp({ playing: true }));
  expect(tree).toMatchSnapshot();
});
