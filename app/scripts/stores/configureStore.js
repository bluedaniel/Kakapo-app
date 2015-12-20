import { Observable } from 'rx';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

function configureStore(debug = false) {
  let createStoreWithMiddleware;

  let middleware = applyMiddleware(thunk);

  if (debug) {
    const logger = createLogger();
    middleware = applyMiddleware(thunk, logger);
  }

  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(
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
