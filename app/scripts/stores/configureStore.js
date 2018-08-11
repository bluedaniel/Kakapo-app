import { applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'remote-redux-devtools';
import createHashHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers/';
import sagas from 'sagas/';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    connectRouter(history)(rootReducer),
    window.__INITIAL_STATE__, // eslint-disable-line no-underscore-dangle
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);

  return store;
};
