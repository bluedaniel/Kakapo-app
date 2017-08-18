import { prop } from 'ramda';
import configureStore from 'stores/configureStore';
import { notifyActions } from 'actions/';

const store = configureStore();

const currState = () => prop('notifications', store.getState());

test('[reducer/notifications]', () => {
  store.dispatch(notifyActions.notify('testID', 'test'));
  expect(currState()).toMatchSnapshot();

  store.dispatch(notifyActions.clear('testID'));
  expect(currState()).toMatchSnapshot();
});
