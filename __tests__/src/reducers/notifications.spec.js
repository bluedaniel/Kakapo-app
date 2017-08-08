import { compose, keys, view, lensIndex, length } from 'ramda';
import { store } from 'stores/configureStore';
import { notifyActions } from 'actions/';
import notifications, { initialState } from 'reducers/notifications';

test.skip('[reducer/notifications]', t => {
  expect.assertions(4);
  store.dispatch(notifyActions.send('test', 1000));
  const state = store.getState();
  expect(compose(length, keys)(state.notifications)).toBe(1);
  expect(view(lensIndex(0), state.notifications)).toBe('test');

  const action = store.dispatch(notifyActions.send('test', 1000));
  action.then(data => {
    const setup = notifications(initialState, data);
    console.log(setup);
    setTimeout(() => {
      expect(data.type).toBe('NOTIFICATION_CLEAR');
      expect(compose(length, keys)(setup)).toBe(0);
    }, 1000);
  });
});
