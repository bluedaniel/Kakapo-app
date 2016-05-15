import test from 'tape';
import { settingActions } from 'actions/';
import settings, { initialState } from 'reducers/settings';

test('[reducer/settings]', t => {
  t.plan(10);

  const setup = settings(initialState, settingActions.initialRender());
  t.equal(initialState.initialRender, false);
  t.equal(setup.initialRender, true, 'trigger `initialRender`');

  const setup1 = settings(initialState, settingActions.desktopUpdate());
  t.equal(setup1.updateStatus, undefined, 'get `updateStatus`');
  const newState1 = settings(setup1, settingActions.desktopUpdate('checking'));
  t.equal(newState1.updateStatus, 'checking', 'set `updateStatus` to checking');

  const setup2 = settings(initialState, settingActions.toggleMute());
  t.equal(setup2.mute, true, 'get `toggleMute` status');
  const newState2 = settings(setup2, settingActions.toggleMute());
  t.equal(newState2.mute, false, 'get `toggleMute` again and should be false');

  const setup3 = settings(initialState, settingActions.toggleDock(true));
  t.equal(setup3.dockIcon, true, 'set `toggleDock` to true');
  const newState3 = settings(setup3, settingActions.toggleDock(!setup3.dockIcon));
  t.equal(newState3.dockIcon, false, 'set `toggleDock` to false');

  const setup4 = settings(initialState, settingActions.toggleDevTools(true));
  t.equal(setup4.devTools, true, 'set `toggleDevTools` to true');
  const newState4 = settings(setup4, settingActions.toggleDevTools(!setup4.devTools));
  t.equal(newState4.devTools, false, 'set `toggleDevTools` to false');
});
