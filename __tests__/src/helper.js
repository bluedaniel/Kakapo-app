import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import color from 'color';
import { lensProp, set, reduce, compose, addIndex, map } from 'ramda';
import { flatteni18n, swatches, newSoundObj } from 'utils/';
import packageJson from '../../package.json';

export const getIntlProps = () => ({
  locale: 'en',
  messages: flatteni18n(kakapoAssets.i18n.en.messages)
});

export const mockEvent = {
  preventDefault: () => ({}),
  stopPropagation: () => ({})
};

const mapIndexed = addIndex(map);

export const randomSounds = compose(
  reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        ...newSoundObj,
        progress: curr > 2 ? 1 : 0.5,
        editing: curr > 2
      }
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
          version: packageJson.config.themeVersion,
          darkUI: swatches('light').indexOf('#673AB7') !== -1,
          colorPickerActive: false, // Close the color picker
          btn: '#4CAF50',
          darkPrimary: color('#673AB7').darken(0.2).toString(),
          primary: '#673AB7'
        }
      };
    }
    case 'search': {
      return {
        search: {
          youtube: [],
          soundcloud: [],
          kakapofavs: []
        }
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
    case 'intl': {
      const intlData = new IntlProvider(getIntlProps(), {});
      return intlData.getChildContext();
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

export const youtubeRes = {
  videos: {
    items: [
      {
        id: { videoId: 'YTg7fpGLsKE' },
        snippet: {
          description: '',
          title: '',
          thumbnails: { high: { url: '' } }
        }
      },
      {
        id: { videoId: 'vWyDDn2-5Gk' },
        snippet: {
          description: '',
          title: '',
          thumbnails: { high: { url: '' } }
        }
      }
    ]
  },
  statistics: {
    items: [
      {
        contentDetails: { duration: 'PT3M28S' },
        statistics: { viewCount: 10000 }
      },
      {
        contentDetails: { duration: 'PT3M28S' },
        statistics: { viewCount: 1000 }
      }
    ]
  }
};
