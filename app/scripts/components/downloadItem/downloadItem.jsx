import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { soundClass } from '../../classes';
import { Progress } from '../ui';
import './downloadItem.css';

export default class DownloadItem extends Component {
  static propTypes = {
    sound: PropTypes.shape(soundClass)
  };

  render() {
    let img = this.props.sound.img;
    if (this.props.sound.source === 'file') img = `http://data.kakapo.co/v2/images/light_${img}.png`;
    return (
      <div className={classNames('download', { active: this.props.sound.progress < 1 })}>
        {img ? <div className="preview" style={{ backgroundImage: `url(${img})` }}/> : <div className="no-image"/>}
        <span className="title">{this.props.sound.name}</span>
        <Progress key={this.props.sound.file + 'progress'} progress={this.props.sound.progress}/>
      </div>
    );
  }
}
