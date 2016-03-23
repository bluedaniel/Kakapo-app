import { expect } from 'chai';
import { store } from 'stores/configureStore';
import { notifyActions } from 'actions/';
import notifications, { initialState } from 'reducers/notifications';

describe('Reducer `notifications`', () => {
  it('send a notification', () => {
    store.dispatch(notifyActions.send('test', 1000));
    const state = store.getState();
    expect(state.notifications.count()).to.eql(1);
    expect(state.notifications.first()).to.eql('test');

    it('clear a notification after 1 second', (done) => {
      const action = store.dispatch(notifyActions.send('test', 1000));
      action.then(data => {
        const setup = notifications(initialState, data);
        expect(data.type).to.eql('NOTIFICATION_CLEAR');
        expect(setup.count()).to.eql(0);
        done();
      });
    });
  });
});
