import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import { fromJS, Map } from 'immutable';
import { flatteni18n } from 'utils/';

export function getIntlProps() {
  return {
    locale: 'en',
    messages: flatteni18n(kakapoAssets.i18n.en.messages)
  };
}

export function getData(slice) {
  switch (slice) {
    case 'themes': {
      return { themes: fromJS(kakapoAssets.theme) };
    }
    case 'search': {
      return { search: fromJS({
        youtube: [],
        soundcloud: [],
        kakapofavs: []
      }) };
    }
    case 'sounds': {
      return { sounds: new Map() };
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
