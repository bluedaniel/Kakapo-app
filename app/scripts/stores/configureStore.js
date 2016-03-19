import {
  FromEventPatternObservable
} from 'rxjs/observable/FromEventPatternObservable';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from 'reducers';

function configureStore(debug = false) {
  const enhancer = [ applyMiddleware(thunk) ];

  /* istanbul ignore if */
  if (debug) enhancer.push(devTools());

  return compose(...enhancer)(createStore)(
    rootReducer,
    window.__INITIAL_STATE__
  );
}

export const store = configureStore(__DEV__ && !__TEST__);

export const observableStore = new FromEventPatternObservable(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState());
