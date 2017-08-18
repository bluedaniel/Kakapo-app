import React from 'react';
import renderer from 'react-test-renderer';
import { SoundList } from 'components/';
import { getData, randomSounds } from '../helper';

test('<SoundList/> render empty', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl')
  };
  const tree = renderer.create(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SoundList/> render', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    sounds: randomSounds(4)
  };
  const tree = renderer.create(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('<SoundList/> progress === 1', () => {
  const props = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    sounds: randomSounds(8)
  };
  const tree = renderer.create(<SoundList {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
