import { prop } from 'ramda';
import { themeActions } from 'actions/';
import configureStore from 'stores/configureStore';

const store = configureStore();

const currState = () => prop('themes', store.getState());

test('[reducer/themes]', () => {
  store.dispatch(themeActions.change('#E91E63', 0));
  expect(currState()).toMatchSnapshot();

  store.dispatch(themeActions.change('#03A9F4', 0));
  expect(currState()).toMatchSnapshot();

  store.dispatch(themeActions.change('#9C27B0', 1));
  expect(currState()).toMatchSnapshot();

  store.dispatch(themeActions.change('#8BC34A', 1));
  expect(currState()).toMatchSnapshot();

  store.dispatch(themeActions.change('#FFEB3B', 0));
  expect(currState()).toMatchSnapshot();
});
