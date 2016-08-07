import 'intl';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { store } from 'stores/configureStore';
import { safe } from 'utils/';
import 'styles/base.css';

const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const appHistory = syncHistoryWithStore(hashHistory, store);

const state = store.getState();
const target = document.querySelector('[app]');

let render = () => {
  const Root = require('./root').default; // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={store}>
      <Root {...{ state, appHistory }} />
    </Provider>,
    target
  );
};

if (module.hot) {
  const renderApp = render;
  const renderError = (err) => {
    const RedBox = require('redbox-react'); // eslint-disable-line global-require

    ReactDOM.render(<RedBox error={err} />, target);
  };

  render = safe(() => renderApp, renderError);

  module.hot.accept('./root', () => setTimeout(render));
}

render();
