import 'intl';
import { IntlProvider } from 'react-intl';
import { store } from 'stores/configureStore';

// Get the apps redux store
export function getReduxStore() {
  return store;
}

// Setup the initial react-intl data
export function getReactIntlContext() {
  const state = store.getState();
  const intlData = new IntlProvider({
    locale: state.settings.intlData.id,
    messages: state.settings.intlData.messages
  });
  return intlData.getChildContext();
}
