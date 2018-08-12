import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from 'stores/configureStore';
import Root from 'root';
import 'styles/base.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Root history={history} />
  </Provider>,
  document.querySelector('[app]')
);
