import { prop } from 'ramda';
import { themeActions } from 'actions/';
import themes, { initialState } from 'reducers/themes';

test('[reducer/themes]', () => {
  expect.assertions(7);
  const setup1 = themes(initialState, themeActions.themesChange('#E91E63', 0));
  expect(prop('primary', setup1)).toBe('#E91E63');
  expect(prop('btn', setup1)).toBe('#4CAF50');

  const setup2 = themes(initialState, themeActions.themesChange('#03A9F4', 0));
  expect(prop('primary', setup2)).toBe('#03A9F4');

  const setup3 = themes(initialState, themeActions.themesChange('#9C27B0', 1));
  expect(prop('btn', setup3)).toBe('#9C27B0');

  const setup4 = themes(initialState, themeActions.themesChange('#8BC34A', 1));
  expect(prop('btn', setup4)).toBe('#8BC34A');

  const setup5 = themes(initialState, themeActions.themesChange('#FFEB3B', 0));
  expect(prop('primary', setup5)).toBe('#FFEB3B');
  expect(prop('darkUI', setup5)).toBe(true);
});
