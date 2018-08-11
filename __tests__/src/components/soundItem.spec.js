import React from 'react';
import { map } from 'ramda';
import { newSoundObj } from 'utils/';
import { SoundItem } from 'components/';
import { getData, createComponentWithIntl } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    soundActions: {},
    ...props,
  };
  return {
    props,
    tree: createComponentWithIntl(<SoundItem {...propData} />).toJSON(),
  };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return { sound: map(x => (x === null ? 'wind' : x), obj) };
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
