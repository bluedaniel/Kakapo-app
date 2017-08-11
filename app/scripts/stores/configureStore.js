import { FromEventPatternObservable } from 'rxjs/observable/FromEventPatternObservable';
import createHashHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'reducers';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;

  return store;
};

export const store = configureStore();

export const observableStore = new FromEventPatternObservable(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState()
);
