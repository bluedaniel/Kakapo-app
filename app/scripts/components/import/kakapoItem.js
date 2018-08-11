import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  concat,
  equals,
  filter,
  length,
  pipe,
  prop,
  propEq,
  replace,
  toLower,
  values,
} from 'ramda';
import { soundActions } from 'actions/';
import { cx } from 'utils/';

export default ({ sounds, sound, dispatch }) => {
  const disabled = pipe(
    values,
    filter(propEq('file', sound.file)),
    length,
    equals(1)
  )(sounds);

  const handleClick = () => {
    if (!disabled) dispatch(soundActions.addSound('kakapo', sound));
  };

  return (
    <div
      className={cx('kakapo-item', { disabled })}
      role="link"
      tabIndex={-1}
      onClick={handleClick}
    >
      <div className="thumbnail">
        <i className={`icon-${sound.img}`} />
      </div>
      <span className="title">
        <FormattedMessage
          id={pipe(
            prop('name'),
            replace(/\s+/g, '_'),
            toLower,
            concat('sounds.')
          )(sound)}
        />
      </span>
    </div>
  );
};
