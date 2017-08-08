import React from 'react';
import { swatches, cx } from 'utils/';
import './colorPicker.css';

export default ({ active, handleSwatch }) =>
  <div className={cx('color-picker', { active })}>
    {swatches().map(
      swatch =>
        <div
          key={swatch}
          onClick={() => handleSwatch(swatch)}
          style={{ backgroundColor: swatch }}
        />,
      this
    )}
  </div>;
