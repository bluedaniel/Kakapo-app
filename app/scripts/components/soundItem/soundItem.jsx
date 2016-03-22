import React from 'react';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';
import { soundActions } from 'actions/';
import { classNames, handleStopPropagation } from 'utils/';
import './soundItem.css';

function observeThrottleVolume(event, dispatch, sound) {
  return Observable.fromEvent(event, 'data', (a) => a)
    .throttleTime(500)
    .subscribe(_s => dispatch(soundActions.soundsVolume(sound, _s)));
}

export default ({ sound, themes, dispatch }) => {
  const eventEmitter = new EventEmitter();
  observeThrottleVolume(eventEmitter, dispatch, sound);

  const handleToggle = () => dispatch(soundActions.soundsPlay(sound));

  const handleDelete = (el) => {
    handleStopPropagation(el);
    dispatch(soundActions.soundsRemove(sound));
  };

  const handleEdit = (el) => {
    handleStopPropagation(el);
    dispatch(soundActions.soundsEdit(sound));
  };

  const handleVolume = ({ target }) => eventEmitter.emit('data', parseFloat(target.value));

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
          onChange={handleVolume}
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
