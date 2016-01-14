import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router';
import { IntlProvider } from 'react-intl';
import { syncReduxAndRouter } from 'redux-simple-router';
import createHashHistory from 'history/lib/createHashHistory';
import routes from 'routes/routes';
import { store } from 'stores/configureStore';

const state = store.getState();
const history = createHashHistory({ queryKey: false });

syncReduxAndRouter(history, store);

const target = document.getElementById('app');
const node = (
  <Provider store={store}>
    <IntlProvider locale={state.settings.intlData.id} messages={state.settings.intlData.messages}>
      <Router history={history}>{routes}</Router>
    </IntlProvider>
  </Provider>
);

ReactDOM.render(node, target);
