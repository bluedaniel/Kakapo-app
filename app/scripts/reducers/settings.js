import { set, lensProp, identity, prop, merge, reduce } from 'ramda';
import kakapoAssets from 'kakapo-assets';
import { bridgedSettings } from 'kakapoBridge';
import { settingTypes } from 'actions/';
import { createReducer, flatteni18n } from 'utils/';

const defaultState = {
  intlData: merge(kakapoAssets.i18n.en, {
    messages: flatteni18n(kakapoAssets.i18n.en.messages)
  }),
  updateStatus: false
};

export let initialState = reduce(
  (acc, k) => set(lensProp(k), bridgedSettings.getItem(k), acc),
  defaultState,
  ['mute', 'lang']
);

/* istanbul ignore if */
if (__DESKTOP__) {
  initialState = merge(initialState, {
    dockIcon: bridgedSettings.getItem('dockIcon'),
    devTools: bridgedSettings.getItem('devTools')
  });
}

const updateSetting = (item, fn) => (state, action) => {
  const val = fn(action);
  bridgedSettings.setItem(item, val);
  return set(lensProp(item), val, state);
};

const setMute = updateSetting(
  'mute',
  () => bridgedSettings.getItem('mute') || false
);
const setDock = updateSetting('dockIcon', prop('bool'));
const setDevtools = updateSetting('devTools', prop('bool'));
const setUpdate = updateSetting('updateStatus', prop('status'));

export default createReducer(initialState, {
  [settingTypes.LANGUAGE]: identity,
  [settingTypes.MUTE]: setMute,
  [settingTypes.DOCK]: setDock,
  [settingTypes.DEVTOOLS]: setDevtools,
  [settingTypes.UPDATE]: setUpdate
});
