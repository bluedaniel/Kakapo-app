import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { swatches } from 'utils/';
import './colorPicker.css';

export default function ColorPicker({ active, handleSwatch }) {
  return (
    <div className={classNames('color-picker', { active: active })}>
      {swatches.all().map(swatch =>
        <div key={swatch} onClick={() => handleSwatch(swatch)} style={{ backgroundColor: swatch }}></div>, this)}
    </div>
  );
}

ColorPicker.propTypes = {
  active: PropTypes.bool,
  handleSwatch: PropTypes.func
};
