import 'intl';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { IntlProvider } from 'react-intl';
import routes from 'routes/routes';
import { store } from 'stores/configureStore';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const state = store.getState();
const target = document.getElementById('app');

const node = (
  <Provider store={store}>
    <IntlProvider locale={state.settings.intlData.id} messages={state.settings.intlData.messages}>
      <Router history={appHistory}>{routes}</Router>
    </IntlProvider>
  </Provider>
);

ReactDOM.render(node, target);
