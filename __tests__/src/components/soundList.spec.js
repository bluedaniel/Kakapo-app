import React from 'react';
import { SoundList } from 'components/';
import { getData, createComponentWithIntl, randomSounds } from '../helper';

test('<SoundList/> render empty', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
  };
  const tree = createComponentWithIntl(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SoundList/> render', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
    sounds: randomSounds(4),
  };
  const tree = createComponentWithIntl(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SoundList/> progress === 1', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
    sounds: randomSounds(8),
  };
  const tree = createComponentWithIntl(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
