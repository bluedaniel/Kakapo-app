import { createActions } from 'reduxsauce';

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

export const { Types, Creators } = createActions(actions, { prefix });
