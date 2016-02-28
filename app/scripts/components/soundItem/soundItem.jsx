import React, { Component, PropTypes } from 'react';
import nouislider from 'nouislider';
import waves from 'node-waves';
import color from 'color';
import { soundActions } from 'actions/';
import { soundClass } from 'classes/';
import { classNames, throttle } from 'utils/';
import './soundItem.css';

export default class SoundItem extends Component {
  static propTypes = {
    themes: PropTypes.object,
    soundActions: PropTypes.object,
    sound: PropTypes.shape(soundClass),
    dispatch: PropTypes.func
  };

  componentWillMount() {
    this.handleVolume = throttle(this.handleVolume, 250);
  }

  componentDidMount() {
    nouislider.create(this.refs.volume, {
      start: this.props.sound.volume,
      connect: 'lower',
      range: {
        min: 0,
        max: 1
      }
    });

    this.refs.volume.noUiSlider.on('update', this.handleVolume.bind(this));

    this.colorSlider();
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

  handleVolume = throttle((data) => {
    this.props.dispatch(soundActions.soundsVolume(this.props.sound, parseFloat(data[0])));
  }, 250);

  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
  }

  colorSlider = () => {
    const sliderColor = color(this.props.themes.get('palette').first()).darken(0.2).hexString();
    this.refs.volume.getElementsByClassName('noUi-origin')[0].style.background = sliderColor;
  };

  renderActions() {
    return (
      <ul className="actions" >
        {this.props.sound.link ? (
          <li>
            <a href={this.props.sound.link} target="_blank">
              <i className={classNames('icon-share', { dark: !this.props.sound.playing })} />
            </a>
          </li>) : ''}
        {this.props.sound.source !== 'youtubeStream' ? (
          <li onClick={this.handleEdit}>
            <i className={classNames('icon-pencil', { dark: !this.props.sound.playing })} />
            </li>) : ''}
        <li onClick={this.handleDelete}>
          <i className={classNames('icon-trash', { dark: !this.props.sound.playing })} />
        </li>
      </ul>
    );
  }

  renderVideo() {
    if (this.props.sound.source === 'youtubeStream') {
      return <div className="youtube-video" id={`video-${this.props.sound.file}`}></div>;
    }
    return <div />;
  }

  render() {
    if (this.refs.volume) this.colorSlider();

    const { themes, sound } = this.props;
    let objStyle = themes.getIn([ 'soundList', 'item' ]).toJS();
    if (sound.playing) {
      objStyle = { ...objStyle, ...themes.getIn([ 'soundList', 'itemPlaying' ]).toJS() };
    }

    const itemClass = classNames({
      playing: sound.playing,
      paused: !sound.playing,
      'youtube-stream': sound.source === 'youtubeStream'
    });
    let img = sound.img;
    if (sound.source === 'file') {
      img = `http://data.kakapo.co/v2/images/${sound.playing ? 'light_' : 'dark_'}${sound.img.replace(/^.*[\\\/]/, '')}.png`;
    }

    return (
      <div
        className={classNames('item', 'waves-effect', 'waves-block', itemClass)}
        onClick={this.handleToggle}
        ref="item"
        style={objStyle}
      >
        <div className="inner">
          {img ? <img src={img} /> : <div className="no-image" />}
          {this.renderActions()}
          <span className="title">
            {sound.name}
          </span>
          <div ref="volume" onClick={this.handleStopPropagation} />
        </div>
        {this.renderVideo()}
      </div>
    );
  }
}
