import kakapoAssets from 'kakapo-assets';
import constants from '../constants';
import { createReducer, flatten } from '../utils';

const lang = localStorage.getItem('language') || 'en';

const initialState = {
  lang: lang,
  intlData: Object.assign({}, kakapoAssets.i18n.en, { messages: flatten(kakapoAssets.i18n.en.messages) })
};

export default createReducer(initialState, {
  [constants.SETTINGS_LANGUAGE]: state => {
    return state;
  }
});
