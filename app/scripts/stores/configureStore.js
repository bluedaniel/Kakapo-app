import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHashHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers/';
import sagas from 'sagas/';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(
    connectRouter(history)(rootReducer),
    window.__INITIAL_STATE__,
    composeEnhancers(...enhancers)
  );
  /* eslint-enable */

  sagaMiddleware.run(sagas);

  return store;
};
