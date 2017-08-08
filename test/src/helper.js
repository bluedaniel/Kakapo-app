import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import color from 'color';
import { lensProp, set } from 'ramda';
import { flatteni18n, swatches } from 'utils/';
import packageJson from '../../package.json';

export function getIntlProps() {
  return {
    locale: 'en',
    messages: flatteni18n(kakapoAssets.i18n.en.messages)
  };
}

export const mockEvent = {
  preventDefault: () => ({}),
  stopPropagation: () => ({})
};

export function getData(slice, opts = {}) {
  switch (slice) {
    case 'themes': {
      return {
        themes: {
          version: packageJson.config.themeVersion,
          darkUI: swatches('light').indexOf('#673AB7') !== -1,
          colorPickerActive: false, // Close the color picker
          btn: '#4CAF50',
          darkPrimary: color('#673AB7').darken(0.2).hexString(),
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
}

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
