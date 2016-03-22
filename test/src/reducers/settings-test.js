import { expect } from 'chai';
import { settingActions } from 'actions/';
import settings, { initialState } from 'reducers/settings';

describe('Reducer `settings`', () => {
  it('trigger `initialRender`', () => {
    const setup = settings(initialState, settingActions.initialRender());
    expect(initialState.initialRender).to.eql(false);
    expect(setup.initialRender).to.eql(true);
  });

  it('get `desktopUpdate` status', () => {
    const setup = settings(initialState, settingActions.desktopUpdate());
    expect(setup.desktopUpdate).to.eql(undefined);

    it('set `desktopUpdate` to checking', () => {
      const newState = settings(setup, settingActions.desktopUpdate('checking'));
      expect(newState.desktopUpdate).to.eql('checking');
    });
  });

  it('get `toggleMute` status', () => {
    const setup = settings(initialState, settingActions.toggleMute());
    expect(setup.mute).to.eql(true);

    it('get `toggleMute` again and should be false', () => {
      const newState = settings(setup, settingActions.toggleMute());
      expect(newState.mute).to.eql(false);
    });
  });

  it('set `toggleDock` to true', () => {
    const setup = settings(initialState, settingActions.toggleDock(true));
    expect(setup.dockIcon).to.eql(true);

    it('set `toggleDock` to false', () => {
      const newState = settings(setup, settingActions.toggleDock(!setup.dockIcon));
      expect(newState.dockIcon).to.eql(false);
    });
  });

  it('set `toggleDevTools` to true', () => {
    const setup = settings(initialState, settingActions.toggleDevTools(true));
    expect(setup.devTools).to.eql(true);

    it('set `toggleDevTools` to false', () => {
      const newState = settings(setup, settingActions.toggleDevTools(!setup.devTools));
      expect(newState.devTools).to.eql(false);
    });
  });
});
