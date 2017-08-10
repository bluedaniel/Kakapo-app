import { compose, keys, values, head, length } from 'ramda';

import { store } from 'stores/configureStore';

import { notifyActions } from 'actions/';

const currState = () => store.getState().notifications;

test('[reducer/notifications]', done => {
  expect.assertions(4);
  store.dispatch(notifyActions.send('test', 1000));
  expect(compose(length, values)(currState())).toBe(1);
  expect(compose(head, values)(currState())).toBe('test');

  return store.dispatch(notifyActions.send('testing', 1000)).then(data => {
    setTimeout(() => {
      expect(data.type).toBe('NOTIFICATION_CLEAR');
      expect(compose(length, keys)(currState())).toBe(0);
      done();
    }, 1100);
  });
});
