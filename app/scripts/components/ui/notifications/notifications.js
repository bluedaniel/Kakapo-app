import React from 'react';
import { classNames } from 'utils/';
import './notifications.css';

export default ({ notifications }) =>
  <aside
    className={classNames('notify', {
      'notify-visible': notifications.count()
    })}
  >
    {Object.keys(notifications.toJS()).map(k =>
      <div key={k}>
        {notifications.toJS()[k]}
      </div>
    )}
  </aside>;
