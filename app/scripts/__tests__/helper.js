import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import { flatten } from 'utils/';
import { fromJS, Map } from 'immutable';

export function getData(slice) {
  switch (slice) {
    case 'themes':
      return { themes: fromJS(kakapoAssets.theme) };
    case 'search':
      return { search: fromJS({
        youtube: [],
        soundcloud: [],
        kakapofavs: []
      }) };
    case 'sounds':
      return { sounds: new Map() };
    case 'settings':
      return { settings: new Map() };
    case 'location':
      return { location: { pathname: '' } };
    case 'intl':
      const intlData = new IntlProvider(getIntlProps(), {});
      return intlData.getChildContext();
  }
}

export function getIntlProps() {
  return {
    locale: 'en',
    messages: flatten(kakapoAssets.i18n.en.messages)
  };
}
