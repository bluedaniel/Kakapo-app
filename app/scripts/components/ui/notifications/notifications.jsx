import React from 'react';
import { classNames } from 'utils/';
import './notifications.css';

export default ({ notifications }) => (
  <aside className={classNames('notify', { 'notify-visible': notifications })}>
    {notifications}
  </aside>
);
