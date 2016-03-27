import React from 'react';
import Rx from 'rxjs';
import { soundActions } from 'actions/';
import { classNames, handleStopPropagation } from 'utils/';
import './soundItem.css';

function observeThrottleVolume(dispatch, sound) {
  const subject = new Rx.Subject()
  .throttleTime(500)
  .distinctUntilChanged();

  subject.subscribe({
    next: (_s) => dispatch(soundActions.soundsVolume(sound, _s))
  });

  return subject;
}

export default ({ sound, themes, dispatch }) => {
  const subject = observeThrottleVolume(dispatch, sound);

  const handleToggle = () => dispatch(soundActions.soundsPlay(sound));

  const handleDelete = (el) => {
    handleStopPropagation(el);
    dispatch(soundActions.soundsRemove(sound));
  };

  const handleEdit = (el) => {
    handleStopPropagation(el);
    dispatch(soundActions.soundsEdit(sound));
  };

  const renderActions = () => (
    <ul className={classNames('actions', { dark: !sound.playing })}>
      {sound.link ? (
        <li>
          <a href={sound.link} target="_blank">
            <i className="icon-share" />
          </a>
        </li>) : ''}
      {sound.source !== 'youtubeStream' ? (
        <li onClick={handleEdit}>
          <i className="icon-edit" />
          </li>) : ''}
      <li onClick={handleDelete}>
        <i className="icon-delete" />
      </li>
    </ul>
  );

  let objStyle = { color: '#121212' };
  if (sound.playing) {
    objStyle = { ...objStyle, backgroundColor: themes.get('primary'), color: '#fff' };
  }

  let img = sound.img;
  if (sound.source === 'file') {
    img = `http://data.kakapo.co/v2/images/${sound.playing ? 'light_' : 'dark_'}${sound.img.replace(/^.*[\\\/]/, '')}.png`;
  }

  return (
    <div
      className={classNames('item', 'waves-effect', 'waves-block', {
        playing: sound.playing,
        paused: !sound.playing,
        'youtube-stream': sound.source === 'youtubeStream'
      })}
      onClick={handleToggle}
      style={objStyle}
    >
      <div className="inner">
        {img ? <img src={img} /> : <div className="no-image" />}
        {renderActions()}
        <span className="title">
          {sound.name}
        </span>
        <input
          defaultValue={sound.volume}
          max="1"
          min="0"
          onChange={({ target }) => subject.next(parseFloat(target.value))}
          onClick={handleStopPropagation}
          step="0.001"
          type="range"
        />
      </div>
      {sound.source === 'youtubeStream' ?
        <div className="youtube-video" id={`video-${sound.file}`} /> : <div />}
    </div>
  );
};
