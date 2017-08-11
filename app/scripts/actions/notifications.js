import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    send: ['msg', 'time'],
    notify: ['id', 'msg'],
    clear: ['id']
  },
  { prefix: 'NOTIFICATIONS_' }
);
