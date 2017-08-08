import test from 'tape';
import { compose, keys, view, lensIndex, length } from 'ramda';
import { store } from 'stores/configureStore';
import { notifyActions } from 'actions/';
import notifications, { initialState } from 'reducers/notifications';

test.skip('[reducer/notifications]', t => {
  t.plan(4);
  store.dispatch(notifyActions.send('test', 1000));
  const state = store.getState();
  t.equal(compose(length, keys)(state.notifications), 1, 'send a notification');
  t.equal(view(lensIndex(0), state.notifications), 'test');

  const action = store.dispatch(notifyActions.send('test', 1000));
  action.then(data => {
    const setup = notifications(initialState, data);
    console.log(setup);
    setTimeout(() => {
      t.equal(
        data.type,
        'NOTIFICATION_CLEAR',
        'clear a notification after 1 second'
      );
      t.equal(compose(length, keys)(setup), 0);
    }, 1000);
  });
});
