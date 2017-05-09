import {
  FromEventPatternObservable
} from 'rxjs/observable/FromEventPatternObservable';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

function configureStore() {
  const enhancer = [applyMiddleware(thunk)];

  return compose(...enhancer)(createStore)(
    rootReducer,
    window.__INITIAL_STATE__
  );
}

export const store = configureStore();

export const observableStore = new FromEventPatternObservable(
  handler => store.subscribe(handler),
  (handler, unsubscribe) => unsubscribe(),
  () => store.getState()
);
