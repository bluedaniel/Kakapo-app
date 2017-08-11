import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    change: ['swatch', 'slotNo']
  },
  { prefix: 'THEMES_' }
);
