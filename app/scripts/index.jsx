import 'intl';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import routes from 'routes/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import { store } from 'stores/configureStore';

const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const appHistory = syncHistoryWithStore(hashHistory, store);

const state = store.getState();
const target = document.getElementById('app');

const node = (
  <Provider store={store}>
    <IntlProvider locale={state.settings.intlData.id} messages={state.settings.intlData.messages}>
      <Router history={appHistory}>{routes}</Router>
    </IntlProvider>
  </Provider>
);

render(node, target);
