import { __, identity, lensProp, merge, prop, set } from 'ramda';
import kakapoAssets from 'kakapo-assets';
import { bridgedSettings } from 'kakapoBridge';
import { settingActions } from 'actions/';
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

const updateSetting = (item, fn) => (state, { payload }) => {
  const val = fn(payload);
  bridgedSettings.setItem(item, val);
  return set(lensProp(item), val, state);
};

export default createReducer(
  __DESKTOP__ ? getDesktopState(initialState) : initialState,
  {
    [settingActions.SETTINGS_LANGUAGE]: identity,
    [settingActions.SETTINGS_MUTE]: updateSetting(
      'mute',
      () => !bridgedSettings.getItem('mute')
    ),
    [settingActions.SETTINGS_DOCK]: updateSetting('dockIcon', prop('bool')),
    [settingActions.SETTINGS_DEVTOOLS]: updateSetting('devTools', prop('bool')),
    [settingActions.SETTINGS_UPDATE]: updateSetting(
      'updateStatus',
      prop('status')
    ),
  }
);
