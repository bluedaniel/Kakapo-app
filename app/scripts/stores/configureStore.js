import { Observable } from 'rx';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { DevTools } from '../containers';

function configureStore(debug = false) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk);

  if (debug) {
    createStoreWithMiddleware = compose(
      middleware,
      DevTools.instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

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
