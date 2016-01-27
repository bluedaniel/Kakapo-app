import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import waves from 'node-waves';
import { throttle } from 'lodash';
import { soundActions } from 'actions/';
import { soundClass } from 'classes/';
import './soundItem.css';

export default class SoundItem extends Component {
  static propTypes = {
    themes: PropTypes.object,
    soundActions: PropTypes.object,
    sound: PropTypes.shape(soundClass)
  };

  componentWillMount() {
    this.handleVolume = throttle(this.handleVolume, 250);
  }

  handleToggle = () => {
    waves.ripple(this.refs.item);
    this.props.dispatch(soundActions.soundsPlay(this.props.sound));
  };

  handleDelete = (el) => {
    this.handleStopPropagation(el);
    this.props.dispatch(soundActions.soundsRemove(this.props.sound));
  };

  handleEdit = (el) => {
    this.handleStopPropagation(el);
    this.props.dispatch(soundActions.soundsEdit(this.props.sound));
  };

  handleVolume = throttle(() => {
    this.props.dispatch(soundActions.soundsVolume(this.props.sound, parseFloat(this.refs.volume.value)));
  }, 250);

  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
  }

  renderActions() {
    return (
      <ul className="actions" >
        {this.props.sound.link ? (
          <li>
            <a href={this.props.sound.link} target="_blank">
              <i className={classNames('icon-share', {
                dark: !this.props.sound.playing
              })}/>
            </a>
          </li>) : ''}
        {this.props.sound.source !== 'youtubeStream' ? (
          <li onClick={this.handleEdit}>
            <i className={classNames('icon-pencil', {
              dark: !this.props.sound.playing
            })}/></li>) : ''}
        <li onClick={this.handleDelete}>
          <i className={classNames('icon-trash', {
            dark: !this.props.sound.playing
          })}/>
        </li>
      </ul>
    );
  }

  renderVideo() {
    if (this.props.sound.source === 'youtubeStream') {
      return (
        <div className="youtube-video" id={`video-${this.props.sound.file}`}></div>
      );
    }
  }

  render() {
    let { themes, sound } = this.props;
    let objStyle = themes.getIn([ 'soundList', 'item' ]).toJS();
    if (sound.playing) objStyle = { ...objStyle, ...themes.getIn([ 'soundList', 'itemPlaying' ]).toJS() };
    const itemClass = classNames({
      playing: sound.playing,
      paused: !sound.playing,
      'youtube-stream': sound.source === 'youtubeStream'
    });
    let img = sound.img;
    if (sound.source === 'file') {
      img = 'http://data.kakapo.co/v2/images/' + (sound.playing ? 'light_' : 'dark_') + sound.img.replace(/^.*[\\\/]/, '') + '.png';
    }

    return (
      <div
        className={classNames('item', 'waves-effect', 'waves-block', itemClass)}
        onClick={this.handleToggle}
        ref="item"
        style={objStyle}
      >
        <div className="inner">
          {img ? <img src={img}/> : <div className="no-image"/>}
          {this.renderActions()}
          <span className="title">
            {sound.name}
          </span>
          <input
            defaultValue={sound.volume}
            max="1"
            min="0"
            onChange={this.handleVolume}
            onClick={this.handleStopPropagation}
            ref="volume"
            step="0.001"
            type="range"
          />
        </div>
        {this.renderVideo()}
      </div>
    );
  }
}
