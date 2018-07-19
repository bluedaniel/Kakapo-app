import { createActions } from 'utils/';

const prefix = 'THEMES_';

const actions = {
  change: ['swatch', 'slotNo'],
};

export default createActions(actions, { prefix });
