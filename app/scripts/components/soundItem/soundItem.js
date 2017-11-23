import React from 'react';
import { prop } from 'ramda';
import { soundActions } from 'actions/';
import { cx, handleStopPropagation, openLink } from 'utils/';
import './soundItem.css';

export default ({ sound, themes, dispatch }) => {
  const handleToggle = () => dispatch(soundActions.play(sound));

  const handleDelete = el => {
    handleStopPropagation(el);
    dispatch(soundActions.remove(sound));
  };

  const handleEdit = el => {
    handleStopPropagation(el);
    dispatch(soundActions.edit(sound));
  };

  const renderActions = () => (
    <div className={cx('actions', { dark: !sound.playing })}>
      {sound.link ? (
        <div>
          <a
            href={sound.link}
            onClick={e => openLink(e, sound.link)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="icon-share" />
          </a>
        </div>
      ) : (
        ''
      )}
      {sound.source !== 'youtubeStream' ? (
        <div role="presentation" onClick={handleEdit}>
          <i className="icon-edit" />
        </div>
      ) : (
        ''
      )}
      <div role="presentation" onClick={handleDelete}>
        <i className="icon-delete" />
      </div>
    </div>
  );

  let objStyle = { color: '#121212' };
  if (sound.playing) {
    objStyle = {
      ...objStyle,
      backgroundColor: prop('primary', themes),
      color: '#fff',
    };
  }

  let icon;
  if (sound.source === 'file') {
    icon = <i className={cx('preview', `icon-${sound.img}`)} />;
  } else {
    icon = sound.img ? (
      <img src={sound.img} alt={sound.name} />
    ) : (
      <div className="no-image" />
    );
  }

  return (
    <div
      onClick={handleToggle}
      style={objStyle}
      role="button"
      tabIndex={-1}
      className={cx('item', 'waves-effect', 'waves-block', {
        playing: sound.playing,
        paused: !sound.playing,
        'youtube-stream': sound.source === 'youtubeStream',
      })}
    >
      <div className="inner">
        {icon}
        {renderActions()}
        <span className="title">{sound.name}</span>
        <input
          defaultValue={sound.volume}
          max="1"
          min="0"
          step="0.01"
          type="range"
          onChange={({ target: { value } }) =>
            dispatch(soundActions.throttleVolume(sound, parseFloat(value)))
          }
          onClick={handleStopPropagation}
        />
      </div>
      {sound.source === 'youtubeStream' ? (
        <div className="youtube-video" id={`video-${sound.file}`} />
      ) : (
        <div />
      )}
    </div>
  );
};
