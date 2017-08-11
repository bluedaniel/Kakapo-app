import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    mute: ['bool'],
    dock: ['bool'],
    devtools: ['bool'],
    language: ['locale'],
    update: ['status']
  },
  { prefix: 'SETTINGS_' }
);
