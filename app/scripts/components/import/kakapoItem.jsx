import React, { PropTypes } from 'react';
import { soundActions } from 'actions/';
import { classNames } from 'utils/';

export default function KakapoItem({ sounds, sound, intl, dispatch }) {
  const disabled = sounds.filter(_s => sound.file === _s.file).count() === 1;

  const handleClick = () => {
    if (!disabled) dispatch(soundActions.addSound('kakapo', sound));
  };

  return (
    <div className={classNames('kakapo-item', { disabled })} onClick={handleClick}>
      <div className="thumbnail">
        <img src={`http://data.kakapo.co/v2/images/dark_${sound.img}.png`} />
      </div>
      <span className="title">
        {intl.formatMessage({ id: (`sounds.${sound.name.replace(/\s+/g, '_').toLowerCase()}`) })}
      </span>
    </div>
  );
}

KakapoItem.contextTypes = { router: PropTypes.object };
