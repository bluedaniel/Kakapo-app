import { prop } from 'ramda';
import configureStore from 'stores/configureStore';
import { settingActions } from 'actions/';

const store = configureStore();

const currState = () => prop('settings', store.getState());

test('[reducer/settings]', () => {
  store.dispatch(settingActions.update());
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.update('checking'));
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.mute());
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.mute());
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.dock(true));
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.dock(false));
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.devtools(true));
  expect(currState()).toMatchSnapshot();

  store.dispatch(settingActions.devtools(false));
  expect(currState()).toMatchSnapshot();
});
