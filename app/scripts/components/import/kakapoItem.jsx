import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { soundActions } from 'actions/';

export default function KakapoItem({ sounds, sound, intl, dispatch }) {
  function alreadyAdded() {
    return sounds.filter(_s => sound.file === _s.file).count() === 1;
  }

  function handleClick() {
    if (!alreadyAdded()) dispatch(soundActions.addSound('kakapo', sound));
  }

  return (
    <div className={classNames('kakapo-item', { disabled: alreadyAdded() })} onClick={handleClick}>
      <div className="thumbnail">
        <img src={`http://data.kakapo.co/v2/images/dark_${sound.img}.png`}/>
      </div>
      <span className="title">
        {intl.formatMessage({ id: (`sounds.${sound.name.replace(/\s+/g, '_').toLowerCase()}`) })}
      </span>
    </div>
  );
}

KakapoItem.contextTypes = { router: PropTypes.object };
