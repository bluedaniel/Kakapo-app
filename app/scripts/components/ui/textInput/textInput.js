import React from 'react';
import { FormattedMessage } from 'react-intl';
import { noop } from 'utils/';

export default ({
  name,
  onChange = noop,
  onFocus = noop,
  onBlur = noop,
  placeholder,
  value,
  spinner,
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
    <label htmlFor={name}>
      <FormattedMessage id={placeholder} defaultMessage={placeholder} />
    </label>
    <span className="highlight" />
    <span className="bar" />
    {spinner && (
      <div className="input-add-on-item spinner active">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    )}
  </div>
);
