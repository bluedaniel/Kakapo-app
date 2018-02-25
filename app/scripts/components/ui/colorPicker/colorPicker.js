import React from 'react';
import { map } from 'ramda';
import { swatches, cx } from 'utils/';
import './colorPicker.css';

export default ({ active, handleSwatch }) => (
  <div className={cx('color-picker', { active })}>
    {map(
      swatch => (
        <div
          key={swatch}
          role="button"
          tabIndex={-1}
          onClick={() => handleSwatch(swatch)}
          style={{ backgroundColor: swatch }}
        />
      ),
      swatches()
    )}
  </div>
);
