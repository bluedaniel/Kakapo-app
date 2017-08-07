import React from 'react';
import { swatches, classNames } from 'utils/';
import './colorPicker.css';

export default ({ active, handleSwatch }) =>
  <div className={classNames('color-picker', { active })}>
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
