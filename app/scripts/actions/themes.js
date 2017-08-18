import { createActions } from 'reduxsauce';

const prefix = 'THEMES_';

const actions = {
  change: ['swatch', 'slotNo']
};

export const { Types, Creators } = createActions(actions, { prefix });
