import React from 'react';

export default ({ checked, handleChange, label, name, dispatch }) => (
  <label className="switch" htmlFor={name}>
    <span className="switch-label">{label}</span>
    <input
      checked={checked}
      id={name}
      name={name}
      onChange={() => dispatch(handleChange(!checked))}
      type="checkbox"
      value={checked}
    />
  </label>
);
