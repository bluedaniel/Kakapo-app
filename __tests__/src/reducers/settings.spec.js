import { settingActions } from 'actions/';
import settings, { initialState } from 'reducers/settings';

test('[reducer/settings]', () => {
  expect.assertions(8);

  const setup1 = settings(initialState, settingActions.desktopUpdate());
  expect(setup1.updateStatus).toBe(undefined);
  const newState1 = settings(setup1, settingActions.desktopUpdate('checking'));
  expect(newState1.updateStatus).toBe('checking');

  const setup2 = settings(initialState, settingActions.toggleMute());
  expect(setup2.mute).toBe(true);
  const newState2 = settings(setup2, settingActions.toggleMute());
  expect(newState2.mute).toBe(false);

  const setup3 = settings(initialState, settingActions.toggleDock(true));
  expect(setup3.dockIcon).toBe(true);
  const newState3 = settings(
    setup3,
    settingActions.toggleDock(!setup3.dockIcon)
  );
  expect(newState3.dockIcon).toBe(false);

  const setup4 = settings(initialState, settingActions.toggleDevTools(true));
  expect(setup4.devTools).toBe(true);
  const newState4 = settings(
    setup4,
    settingActions.toggleDevTools(!setup4.devTools)
  );
  expect(newState4.devTools).toBe(false);
});
