import { apply, compose, keys, length, lensProp, props, set } from 'ramda';
import { darken } from 'polished';
import { bridgedThemes } from 'kakapoBridge';
import { themeActions } from 'actions/';
import { createReducer, swatches } from 'utils/';
import appConfig from 'config/';

const createTheme = (palette1 = '#673AB7', palette2 = '#4CAF50') => ({
  version: appConfig.themeVersion,
  darkUI: swatches('light').indexOf(palette1) !== -1,
  colorPickerActive: false, // Close the color picker
  btn: palette2,
  darkPrimary: darken(0.2, palette1),
  primary: palette1,
});

const themeFromStore = bridgedThemes.fromStorage();

export const initialState = compose(
  length,
  keys
)(themeFromStore)
  ? themeFromStore
  : createTheme();

const generateStyles = (state, { payload: { swatch, slotNo } }) =>
  compose(
    apply(createTheme),
    props(['primary', 'btn']),
    set(lensProp(slotNo ? 'btn' : 'primary'), swatch)
  )(state);

export default createReducer(initialState, {
  [themeActions.THEMES_CHANGE]: generateStyles,
});
