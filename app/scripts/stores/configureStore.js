import fromEventPattern from '@rxjs/rx/observable/fromeventpattern';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from 'reducers';

function configureStore(debug = false) {
  const enhancer = [ applyMiddleware(thunk) ];

  /* istanbul ignore if */
  if (debug) enhancer.push(devTools());

  const store = compose(...enhancer)(createStore)(
    rootReducer,
    window.__INITIAL_STATE__
  );

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export const store = configureStore(__DEV__ && !__TEST__);

export const observableStore = fromEventPattern(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState());
