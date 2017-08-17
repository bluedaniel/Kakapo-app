import { createActions } from 'reduxsauce';

const prefix = 'SETTINGS_';

const actions = {
  mute: ['bool'],
  dock: ['bool'],
  devtools: ['bool'],
  language: ['locale'],
  update: ['status']
};

export const { Types, Creators } = createActions(actions, { prefix });
