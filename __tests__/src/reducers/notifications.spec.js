import { compose, keys, values, head, prop, length } from 'ramda';
import configureStore from 'stores/configureStore';
import { notifyActions } from 'actions/';

const store = configureStore();

const currState = () => prop('notifications', store.getState());

test.skip('[reducer/notifications]', done => {
  expect.assertions(4);
  store.dispatch(notifyActions.send('test', 500));
  expect(compose(length, values)(currState())).toBe(1);
  expect(compose(head, values)(currState())).toBe('test');

  store.dispatch(notifyActions.send('testing', 500));
  setTimeout(() => {
    expect(compose(length, keys)(currState())).toBe(0);
    done();
  }, 1100);
});
