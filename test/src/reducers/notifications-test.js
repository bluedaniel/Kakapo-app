import { expect } from 'chai';
import { notifyActions } from 'actions/';
import notifications, { initialState } from 'reducers/notifications';

describe('Reducer `notifications`', () => {
  it('send a notification', () => {
    const setup = notifications(initialState, notifyActions.notify('uniq1', 'test'));
    expect(setup.count()).to.eql(1);
    expect(setup.get('uniq1')).to.eql('test');

    it('clear a notification', () => {
      const setup = notifications(initialState, notifyActions.clear('uniq1'));
      expect(setup.count()).to.eql(0);
    });
  });
});
