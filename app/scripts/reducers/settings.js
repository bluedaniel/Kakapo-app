import { __, set, lensProp, identity, prop, merge } from 'ramda';
import kakapoAssets from 'kakapo-assets';
import { bridgedSettings } from 'kakapoBridge';
import { settingTypes } from 'actions/';
import { createReducer, flatteni18n } from 'utils/';

export const initialState = {
  intlData: merge(kakapoAssets.i18n.en, {
    messages: flatteni18n(kakapoAssets.i18n.en.messages),
  }),
  updateStatus: false,
  mute: bridgedSettings.getItem('mute'),
  lang: bridgedSettings.getItem('lang'),
};

const getDesktopState = merge(__, {
  dockIcon: bridgedSettings.getItem('dockIcon'),
  devTools: bridgedSettings.getItem('devTools'),
});

const updateSetting = (item, fn) => (state, action) => {
  const val = fn(action);
  bridgedSettings.setItem(item, val);
  return set(lensProp(item), val, state);
};

export default createReducer(
  __DESKTOP__ ? getDesktopState(initialState) : initialState,
  {
    [settingTypes.LANGUAGE]: identity,
    [settingTypes.MUTE]: updateSetting(
      'mute',
      () => !bridgedSettings.getItem('mute')
    ),
    [settingTypes.DOCK]: updateSetting('dockIcon', prop('bool')),
    [settingTypes.DEVTOOLS]: updateSetting('devTools', prop('bool')),
    [settingTypes.UPDATE]: updateSetting('updateStatus', prop('status')),
  }
);
