import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    input: ['input'],
    kakapo: null,
    youtube: ['term'],
    soundcloud: ['term'],
    request: null,
    requestSuccess: ['items', 'service'],
    requestError: ['err']
  },
  { prefix: 'SEARCH_' }
);
