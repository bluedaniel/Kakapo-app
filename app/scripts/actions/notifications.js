import { createActions } from 'reduxsauce';

const prefix = 'NOTIFICATIONS_';

const actions = {
  send: ['msg', 'time'],
  notify: ['id', 'msg'],
  clear: ['id'],
};

export const { Types, Creators } = createActions(actions, { prefix });
