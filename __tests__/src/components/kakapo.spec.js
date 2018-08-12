import React from 'react';
import { identity, values } from 'ramda';
import { ImportKakapo } from 'components/import/kakapo';
import { getData, createComponentWithIntl, randomSounds } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    dispatch: identity,
    ...props,
  };
  return {
    props,
    tree: createComponentWithIntl(<ImportKakapo {...propData} />).toJSON(),
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
