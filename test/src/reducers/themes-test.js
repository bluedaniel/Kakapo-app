import test from 'tape';
import { themeActions } from 'actions/';
import themes, { initialState } from 'reducers/themes';

test('[reducer/themes]', t => {
  t.plan(7);
  const setup1 = themes(initialState, themeActions.themesChange('#E91E63', 0));
  t.equal(setup1.get('primary'), '#E91E63', 'change primary color to `#E91E63`');
  t.equal(setup1.get('btn'), '#4CAF50');

  const setup2 = themes(initialState, themeActions.themesChange('#03A9F4', 0));
  t.equal(setup2.get('primary'), '#03A9F4', 'change primary color to `#03A9F4`');

  const setup3 = themes(initialState, themeActions.themesChange('#9C27B0', 1));
  t.equal(setup3.get('btn'), '#9C27B0', 'change secondary color to `#9C27B0`');

  const setup4 = themes(initialState, themeActions.themesChange('#8BC34A', 1));
  t.equal(setup4.get('btn'), '#8BC34A', 'change secondary color to `#8BC34A`');

  const setup5 = themes(initialState, themeActions.themesChange('#FFEB3B', 0));
  t.equal(setup5.get('primary'), '#FFEB3B', 'change primary color to a dark theme color `#FFEB3B`');
  t.equal(setup5.get('darkUI'), true);
});
