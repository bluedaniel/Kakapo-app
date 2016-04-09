import React from 'react';
import { soundActions } from 'actions/';
import { classNames } from 'utils/';

export default ({ sounds, sound, intl, dispatch }) => {
  const disabled = sounds.filter(_s => sound.file === _s.file).count() === 1;

  const handleClick = () => {
    if (!disabled) dispatch(soundActions.addSound('kakapo', sound));
  };

  return (
    <div className={classNames('kakapo-item', { disabled })} onClick={handleClick}>
      <div className="thumbnail">
        <i className={`icon-${sound.img}`} />
      </div>
      <span className="title">
        {intl.formatMessage({ id: (`sounds.${sound.name.replace(/\s+/g, '_').toLowerCase()}`) })}
      </span>
    </div>
  );
};
