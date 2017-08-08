import { apply, set, props, compose, keys, length, lensProp } from 'ramda';
import color from 'color';
import { bridgedThemes } from 'kakapoBridge';
import constants from 'actions/constants/';
import { createReducer, swatches } from 'utils/';
import { observableStore } from 'stores/configureStore';
import packageJson from '../../../package.json';

const { THEMES_CHANGE } = constants;

const createTheme = (palette1 = '#673AB7', palette2 = '#4CAF50') => ({
  version: packageJson.config.themeVersion,
  darkUI: swatches('light').indexOf(palette1) !== -1,
  colorPickerActive: false, // Close the color picker
  btn: palette2,
  darkPrimary: color(palette1).darken(0.2).toString(),
  primary: palette1
});

const themeFromStore = bridgedThemes.fromStorage();

export let initialState = compose(length, keys)(themeFromStore)
  ? themeFromStore
  : createTheme();

const themeReducers = {
  generateStyles(state, swatch, slotNo) {
    return compose(
      apply(createTheme),
      props(['primary', 'btn']),
      set(lensProp(slotNo ? 'btn' : 'primary'), swatch)
    )(state);
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
