import React from 'react';
import { classNames } from 'utils/';
import './notifications.css';

export default ({ notifications }) =>
  <aside
    className={classNames('notify', {
      'notify-visible': Object.keys(notifications).length
    })}
  >
    {Object.keys(notifications).map(k =>
      <div key={k}>
        {notifications.toJS()[k]}
      </div>
    )}
  </aside>;
