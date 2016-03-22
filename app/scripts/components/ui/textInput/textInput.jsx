import React from 'react';

export default ({ name,
  onChange = () => ({}),
  onFocus = () => ({}),
  onBlur = () => ({}),
  placeholder,
  value,
  spinner,
  intl
}) => (
  <div className="group">
    <input
      type="text"
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      defaultValue={value}
      autoComplete="off"
      required
    />
    <span className="highlight"></span>
    <span className="bar"></span>
    <label>{intl.formatMessage({ id: placeholder, defaultMessage: placeholder })}</label>
    {spinner &&
      <div className="input-add-on-item spinner active">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    }
  </div>
);
