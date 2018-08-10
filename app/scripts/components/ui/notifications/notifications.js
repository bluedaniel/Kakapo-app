import React from 'react';
import { pipe, keys, length, map, toPairs } from 'ramda';
import { cx } from 'utils/';
import './notifications.css';

export default ({ notifications }) => (
  <aside
    className={cx('notify', {
      'notify-visible': pipe(keys, length)(notifications),
    })}
  >
    {pipe(toPairs, map(([k, v]) => <div key={k}>{v}</div>))(notifications)}
  </aside>
);
