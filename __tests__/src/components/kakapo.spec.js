import React from 'react';
import renderer from 'react-test-renderer';
import { identity, values } from 'ramda';
import { ImportKakapo } from 'components/';
import { getData, randomSounds } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    ...getData('intl'),
    dispatch: identity,
    ...props,
  };
  return {
    props,
    tree: renderer.create(<ImportKakapo {...propData} />).toJSON(),
  };
}

test('<Kakapo/> render', () => {
  const { tree } = setup();
  expect(tree).toMatchSnapshot();
});

test('<Kakapo/> render items', () => {
  const { tree } = setup({
    search: { kakapofavs: values(randomSounds(5)) },
  });
  expect(tree).toMatchSnapshot();
});
