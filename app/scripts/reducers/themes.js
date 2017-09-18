import { apply, set, props, compose, keys, length, lensProp } from 'ramda';
import color from 'color';
import { bridgedThemes } from 'kakapoBridge';
import { themeTypes } from 'actions/';
import { createReducer, swatches } from 'utils/';

const createTheme = (palette1 = '#673AB7', palette2 = '#4CAF50') => ({
  version: process.env.npm_package_config_themeVersion,
  darkUI: swatches('light').indexOf(palette1) !== -1,
  colorPickerActive: false, // Close the color picker
  btn: palette2,
  darkPrimary: color(palette1)
    .darken(0.2)
    .toString(),
  primary: palette1
});

const themeFromStore = bridgedThemes.fromStorage();

export const initialState = compose(length, keys)(themeFromStore)
  ? themeFromStore
  : createTheme();

const generateStyles = (state, { swatch, slotNo }) =>
  compose(
    apply(createTheme),
    props(['primary', 'btn']),
    set(lensProp(slotNo ? 'btn' : 'primary'), swatch)
  )(state);

export default createReducer(initialState, {
  [themeTypes.CHANGE]: generateStyles
});
