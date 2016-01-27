import { Observable } from 'rx';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';
import { syncHistory } from 'react-router-redux';

function configureStore(debug = false) {
  let middlewares = [ thunk, syncHistory(browserHistory) ];

  if (debug) {
    middlewares.push(createLogger());
  }

  const store = compose(applyMiddleware(...middlewares))(createStore)(
    rootReducer,
    window.__INITIAL_STATE__
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export const store = configureStore(__DEV__);

export const observableStore = Observable.fromEventPattern(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState());
