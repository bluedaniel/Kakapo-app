import constants from '../constants';

export default {
  themesChange: (swatch, slotNo) => ({ type: constants.THEMES_CHANGE, swatch, slotNo })
};
