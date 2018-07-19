import { createActions } from 'utils/';

const prefix = 'SETTINGS_';

const actions = {
  mute: ['bool'],
  dock: ['bool'],
  devtools: ['bool'],
  language: ['locale'],
  update: ['status'],
};

export default createActions(actions, { prefix });
