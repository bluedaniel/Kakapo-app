import { prop } from 'ramda';
import { themeActions } from 'actions/';
import { store } from 'stores/configureStore';

const currState = () => store.getState().themes;

test('[reducer/themes]', () => {
  expect.assertions(7);
  store.dispatch(themeActions.themesChange('#E91E63', 0));
  expect(prop('primary', currState())).toBe('#E91E63');
  expect(prop('btn', currState())).toBe('#4CAF50');

  store.dispatch(themeActions.themesChange('#03A9F4', 0));
  expect(prop('primary', currState())).toBe('#03A9F4');

  store.dispatch(themeActions.themesChange('#9C27B0', 1));
  expect(prop('btn', currState())).toBe('#9C27B0');

  store.dispatch(themeActions.themesChange('#8BC34A', 1));
  expect(prop('btn', currState())).toBe('#8BC34A');

  store.dispatch(themeActions.themesChange('#FFEB3B', 0));
  expect(prop('primary', currState())).toBe('#FFEB3B');
  expect(prop('darkUI', currState())).toBe(true);
});
