import constants from 'constants/';

const { THEMES_CHANGE } = constants;

export default {
  themesChange: (swatch, slotNo) => ({ type: THEMES_CHANGE, swatch, slotNo })
};
