import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  settingsMute: ['bool'],
  settingsDock: ['bool'],
  settingsDevtools: ['bool'],
  settingsLanguage: ['locale'],
  settingsUpdate: ['status']
});
