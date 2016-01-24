import { IntlProvider } from 'react-intl';
import kakapoAssets from 'kakapo-assets';
import { flatten } from 'utils/';
import { fromJS, Map } from 'immutable';

// Get data to fill fake store with
export function getFakeData(slice) {
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
  }
}

// Create a fake store with data to be added by test as it needs it
export function getFakeStore(fakeData) {
  const self = {
    getState() {
      return fakeData;
    },
    subscribe() {
      return;
    },
    dispatch(action) {
      return action(self);
    }
  };
  return self;
}

export function getIntlProps() {
  return {
    locale: 'en',
    messages: flatten(kakapoAssets.i18n.en.messages)
  };
}

// Setup the initial react-intl data
export function getReactIntlContext() {
  const intlData = new IntlProvider(getIntlProps(), {});
  return intlData.getChildContext();
}
