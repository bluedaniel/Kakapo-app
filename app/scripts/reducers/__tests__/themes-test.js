/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import themes, { initialState } from '../themes';
import { themeActions } from 'actions/';

describe('Reducer `themes`', () => {
  it('change primary color to `#E91E63`', () => {
    const setup = themes(initialState, themeActions.themesChange('#E91E63', 0));
    expect(setup.getIn([ 'nav', 'navbar', 'backgroundColor' ])).to.eql('#C3134E');
    expect(setup.getIn([ 'header', 'download', 'color' ])).to.eql('#fff');
  });

  it('change primary color to `#03A9F4`', () => {
    const setup = themes(initialState, themeActions.themesChange('#03A9F4', 0));
    expect(setup.getIn([ 'nav', 'navbar', 'backgroundColor' ])).to.eql('#0284C0');
    expect(setup.getIn([ 'header', 'download', 'color' ])).to.eql('#fff');
  });

  it('change secondary color to `#9C27B0`', () => {
    const setup = themes(initialState, themeActions.themesChange('#9C27B0', 1));
    expect(setup.getIn([ 'base', 'btnPrimary', 'backgroundColor' ])).to.eql('#9C27B0');
  });

  it('change secondary color to `#8BC34A`', () => {
    const setup = themes(initialState, themeActions.themesChange('#8BC34A', 1));
    expect(setup.getIn([ 'base', 'btnPrimary', 'backgroundColor' ])).to.eql('#8BC34A');
  });

  it('change primary color to a dark theme color `#FFEB3B`', () => {
    const setup = themes(initialState, themeActions.themesChange('#FFEB3B', 0));
    expect(setup.getIn([ 'nav', 'navbar', 'backgroundColor' ])).to.eql('#FFE500');
    expect(setup.getIn([ 'header', 'download', 'color' ])).to.eql('#121212');
  });
});