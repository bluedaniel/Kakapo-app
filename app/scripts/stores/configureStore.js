import { Observable } from 'rx';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';

function configureStore(debug = false) {
  const middlewares = [ thunk ];

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

export const store = configureStore(__DEV__ && !__TEST__);

export const observableStore = Observable.fromEventPattern(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState());
