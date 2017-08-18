import React from 'react';
import { equals, length, filter, values, compose } from 'ramda';
import { soundActions } from 'actions/';
import { cx } from 'utils/';

export default ({ sounds, sound, intl, dispatch }) => {
  const disabled = compose(
    equals(1),
    length,
    filter(_s => sound.file === _s.file),
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
        {intl.formatMessage({
          id: `sounds.${sound.name.replace(/\s+/g, '_').toLowerCase()}`
        })}
      </span>
    </div>
  );
};
