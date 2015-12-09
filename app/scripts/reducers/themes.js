import { fromJS } from 'immutable';
import color from 'color';
import kakapoAssets from 'kakapo-assets';
import constants from '../constants';
import { createReducer, swatches } from '../utils';
import { observableStore } from '../stores/configureStore';

let initialState = new fromJS(JSON.parse(localStorage.getItem('theme')) || kakapoAssets.theme);

function saveToStorage() {
  observableStore.subscribe(_x => {
    if (initialState === _x.themes) return; // Still the same state
    localStorage.setItem('theme', JSON.stringify(_x.themes));
    initialState = _x.themes;
  });
}

function colorVars(hex) {
  const chosenColor = color(hex);
  return {
    darkPrimary: chosenColor.darken(0.2).hexString(),
    primary: chosenColor.hexString(),
    lightPrimary: chosenColor.lighten(0.2).hexString(),
    verylightPrimary: chosenColor.lighten(0.4).hexString()
  };
}

function generateStyles(state, swatch, slotNo) {
  state = state.updateIn([ 'palette', slotNo ], () => swatch); // Update swatch
  const _c = colorVars(state.get('palette').get(0)); // Get color vals
  const darkUI = swatches.light.indexOf(state.get('palette').get(0)) !== -1; // DarkUI switch

  return state.mergeDeep(fromJS({
    darkUI: darkUI,
    colorPickerActive: false, // Close the color picker
    base: {
      btnPrimary: {
        borderColor: state.get('palette').get(1),
        backgroundColor: state.get('palette').get(1)
      }
    },
    header: {
      download: {
        backgroundColor: _c.lightPrimary,
        color: darkUI ? '#121212' : '#fff'
      },
      titlebar: { backgroundColor: _c.darkPrimary },
      h3: { color: darkUI ? '#121212' : '#fff' }
    },
    nav: {
      navbar: { backgroundColor: _c.primary },
      tab: { color: darkUI ? '#121212' : '#fff' },
      tabActive: { backgroundColor: _c.darkPrimary }
    },
    soundList: {
      itemPlaying: {
        color: darkUI ? '#121212' : '#fff',
        backgroundColor: _c.lightPrimary
      },
      title: { color: !darkUI ? '#121212' : '#fff' },
      actions: { color: !darkUI ? '#121212' : '#fff' }
    }
  }));
}

export default createReducer(initialState, {
  [constants.THEMES_CHANGE]: (state, action) => {
    saveToStorage();
    return generateStyles(state, action.swatch, action.slotNo);
  }
});
