import { fromJS } from 'immutable';
import color from 'color';
import { bridgedThemes } from 'kakapoBridge';
import constants from 'constants/';
import { createReducer, swatches } from 'utils/';
import { observableStore } from 'stores/configureStore';
import packageJson from '../../../package.json';

const { THEMES_CHANGE } = constants;

const createTheme = (palette1 = '#673AB7', palette2 = '#4CAF50') => ({
  version: packageJson.config.themeVersion,
  darkUI: swatches('light').indexOf(palette1) !== -1,
  colorPickerActive: false, // Close the color picker
  btn: palette2,
  darkPrimary: color(palette1).darken(0.2).hexString(),
  primary: palette1
});

const themeFromStore = bridgedThemes.fromStorage();

export let initialState = fromJS(
  Object.keys(themeFromStore).length ? themeFromStore : createTheme()
);

const themeReducers = {
  generateStyles(state, swatch, slotNo) {
    state = state.update(slotNo ? 'btn' : 'primary', () => swatch); // Update swatch
    const newTheme = createTheme(state.get('primary'), state.get('btn'));
    return fromJS(newTheme);
  },
  saveToStorage() {
    observableStore.subscribe(_x => {
      if (initialState === _x.themes) return; // Still the same state
      bridgedThemes.saveToStorage(JSON.stringify(_x.themes));
      initialState = _x.themes;
    });
  }
};

export default createReducer(initialState, {
  [THEMES_CHANGE]: (state, { swatch, slotNo }) => {
    themeReducers.saveToStorage();
    return themeReducers.generateStyles(state, swatch, slotNo);
  }
});
