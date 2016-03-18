/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import { themeActions } from 'actions/';
import themes, { initialState } from 'reducers/themes';

describe('Reducer `themes`', () => {
  it('change primary color to `#E91E63`', () => {
    const setup = themes(initialState, themeActions.themesChange('#E91E63', 0));
    expect(setup.get('primary')).to.eql('#E91E63');
    expect(setup.get('btn')).to.eql('#4CAF50');
  });

  it('change primary color to `#03A9F4`', () => {
    const setup = themes(initialState, themeActions.themesChange('#03A9F4', 0));
    expect(setup.get('primary')).to.eql('#03A9F4');
  });

  it('change secondary color to `#9C27B0`', () => {
    const setup = themes(initialState, themeActions.themesChange('#9C27B0', 1));
    expect(setup.get('btn')).to.eql('#9C27B0');
  });

  it('change secondary color to `#8BC34A`', () => {
    const setup = themes(initialState, themeActions.themesChange('#8BC34A', 1));
    expect(setup.get('btn')).to.eql('#8BC34A');
  });

  it('change primary color to a dark theme color `#FFEB3B`', () => {
    const setup = themes(initialState, themeActions.themesChange('#FFEB3B', 0));
    expect(setup.get('primary')).to.eql('#FFEB3B');
    expect(setup.get('darkUI')).to.eql(true);
  });
});
