import { createActions } from 'utils/';

const prefix = 'NOTIFICATIONS_';

const actions = {
  send: ['msg', 'time'],
  notify: ['id', 'msg'],
  clear: ['id'],
};

export default createActions(actions, { prefix });
