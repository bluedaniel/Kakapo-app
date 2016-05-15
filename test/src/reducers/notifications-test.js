import test from 'tape';
import { store } from 'stores/configureStore';
import { notifyActions } from 'actions/';
import notifications, { initialState } from 'reducers/notifications';

test('[reducer/notifications]', t => {
  t.plan(4);
  store.dispatch(notifyActions.send('test', 1000));
  const state = store.getState();
  t.equal(state.notifications.count(), 1, 'send a notification');
  t.equal(state.notifications.first(), 'test');

  const action = store.dispatch(notifyActions.send('test', 1000));
  action.then(data => {
    const setup = notifications(initialState, data);
    setTimeout(() => {
      t.equal(data.type, 'NOTIFICATION_CLEAR', 'clear a notification after 1 second');
      t.equal(setup.count(), 0);
    }, 1000);
  });
});
