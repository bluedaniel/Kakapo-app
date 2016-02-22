/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import settings, { initialState } from '../settings';
import { settingActions } from 'actions/';

describe('Reducer `settings`', () => {
  it('set `toggleDock` to true', () => {
    const setup = settings(initialState, settingActions.toggleDock(true));
    expect(setup.dockIcon).to.eql(true);

    it('set `toggleDock` to true', () => {
      const newState = settings(setup, settingActions.toggleDock(!setup.dockIcon));
      expect(newState.dockIcon).to.eql(false);
    });
  });

  it('set `toggleDevTools` to true', () => {
    const setup = settings(initialState, settingActions.toggleDevTools(true));
    expect(setup.devTools).to.eql(true);

    it('set `toggleDevTools` to true', () => {
      const newState = settings(setup, settingActions.toggleDevTools(!setup.devTools));
      expect(newState.devTools).to.eql(false);
    });
  });
});
