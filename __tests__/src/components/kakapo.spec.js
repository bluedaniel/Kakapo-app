import React from 'react';
import { shallow } from 'enzyme';
import { identity, values } from 'ramda';
import {
  ImportKakapo as Kakapo,
  ImportKakapoItem as KakapoItem
} from 'components/';
import { getData, randomSounds } from '../helper';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    ...getData('intl'),
    dispatch: identity,
    ...props
  };
  return { props, wrapper: shallow(<Kakapo {...propData} />) };
}

test('<Kakapo/> render', () => {
  const { wrapper } = setup();
  expect(wrapper.type()).toBe('div');
  expect(wrapper.prop('className')).toBe('kakapo');
});

test('<Kakapo/> render items', () => {
  const { wrapper } = setup({
    search: { kakapofavs: values(randomSounds(5)) }
  });
  expect(wrapper.find(KakapoItem).length).toBe(5);
});
