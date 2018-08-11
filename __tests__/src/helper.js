import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import { darken } from 'polished';
import { lensProp, set, reduce, compose, addIndex, map } from 'ramda';
import { flatteni18n, swatches, newSoundObj } from 'utils/';
import youtubeMock from '../../__mocks__/youtube.json';
import soundcloudMock from '../../__mocks__/soundcloud.json';

const intlProps = {
  locale: 'en',
  messages: flatteni18n(kakapoAssets.i18n.en.messages),
};

export const createComponentWithIntl = children =>
  renderer.create(<IntlProvider {...intlProps}>{children}</IntlProvider>);

export const mockEvent = {
  preventDefault: () => ({}),
  stopPropagation: () => ({}),
};

const mapIndexed = addIndex(map);

export const randomSounds = compose(
  reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        ...newSoundObj,
        name: 'thunder',
        file: curr,
        progress: curr > 2 ? 1 : 0.5,
        editing: curr > 2,
      },
    }),
    {}
  ),
  mapIndexed((x, i) => i),
  x => Array(x).fill(0)
);

export const getData = (slice, opts = {}) => {
  switch (slice) {
    case 'themes': {
      return {
        themes: {
          version: '0.0.1',
          darkUI: swatches('light').indexOf('#673AB7') !== -1,
          colorPickerActive: false, // Close the color picker
          btn: '#4CAF50',
          darkPrimary: darken(0.2, '#673AB7'),
          primary: '#673AB7',
        },
      };
    }
    case 'search': {
      return {
        search: {
          youtube: [],
          soundcloud: [],
          kakapofavs: [],
        },
      };
    }
    case 'sounds': {
      let sounds = {};
      if (opts.full) {
        kakapoAssets.sounds.map(_s => {
          sounds = set(lensProp(_s.file), { ..._s }, sounds);
          return sounds;
        });
      }
      return { sounds };
    }
    case 'settings': {
      return { settings: {} };
    }
    case 'location': {
      return { location: { pathname: '' } };
    }
    default: {
      return {};
    }
  }
};

export const stubFetchWith = data => {
  const res = {};
  res.json = () => data;
  return res;
};

export const kakapoRes = kakapoAssets.sounds;
export const youtubeRes = youtubeMock;
export const soundcloudRes = soundcloudMock;
