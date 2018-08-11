import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  compose,
  concat,
  equals,
  filter,
  length,
  prop,
  propEq,
  replace,
  toLower,
  values,
} from 'ramda';
import { soundActions } from 'actions/';
import { cx } from 'utils/';

export default ({ sounds, sound, dispatch }) => {
  const disabled = compose(
    equals(1),
    length,
    filter(propEq('file', sound.file)),
    values
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
          id={compose(
            concat('sounds.'),
            toLower,
            replace(/\s+/g, '_'),
            prop('name')
          )(sound)}
        />
      </span>
    </div>
  );
};
