import React from 'react';
import { cx } from 'utils/';
import './notifications.css';

export default ({ notifications }) => (
  <aside
    className={cx('notify', {
      'notify-visible': Object.keys(notifications).length,
    })}
  >
    {Object.keys(notifications).map(k => <div key={k}>{notifications[k]}</div>)}
  </aside>
);
