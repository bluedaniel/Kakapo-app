import { createActions } from 'utils/';

const prefix = 'SEARCH_';

const actions = {
  input: ['input'],
  kakapo: null,
  youtube: ['term'],
  soundcloud: ['term'],
  request: null,
  requestSuccess: ['items', 'service'],
  requestError: ['err'],
};

export default createActions(actions, { prefix });
