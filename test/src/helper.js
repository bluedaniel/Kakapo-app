import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import color from 'color';
import { fromJS, Map } from 'immutable';
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
      return { themes: fromJS({
        version: packageJson.config.themeVersion,
        darkUI: swatches('light').indexOf('#673AB7') !== -1,
        colorPickerActive: false, // Close the color picker
        btn: '#4CAF50',
        darkPrimary: color('#673AB7').darken(0.2).hexString(),
        primary: '#673AB7'
      }) };
    }
    case 'search': {
      return { search: fromJS({
        youtube: [],
        soundcloud: [],
        kakapofavs: []
      }) };
    }
    case 'sounds': {
      let sounds = new Map();
      if (opts.full) {
        kakapoAssets.sounds.map(_s => {
          sounds = sounds.set(_s.file, { ..._s });
          return sounds;
        });
      }
      return { sounds };
    }
    case 'settings': {
      return { settings: new Map() };
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
  res.json = () => (data);
  return res;
};

export const kakapoRes = kakapoAssets.sounds;

export const youtubeRes = {
  videos: {
    items: [ {
      id: { videoId: 'YTg7fpGLsKE' },
      snippet: {
        description: '',
        title: '',
        thumbnails: { high: { url: '' } }
      }
    }, {
      id: { videoId: 'vWyDDn2-5Gk' },
      snippet: {
        description: '',
        title: '',
        thumbnails: { high: { url: '' } }
      }
    } ]
  },
  statistics: {
    items: [
      { contentDetails: { duration: 'PT3M28S' }, statistics: { viewCount: 10000 } },
      { contentDetails: { duration: 'PT3M28S' }, statistics: { viewCount: 1000 } }
    ]
  }
};
