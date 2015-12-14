import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { soundClass } from '../../classes';
import { ProgressBar } from '../ui';

export default class DownloadItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let img = this.props.sound.img;
    if (this.props.sound.source === 'file') img = `http://data.kakapo.co/v2/images/dark_${img}.png`;
    return (
      <div className={classNames('download', { active: this.props.sound.progress < 1 })}>
        <div className="preview" style={{ backgroundImage: `url(${img})` }}/>
        <span className="title">{this.props.sound.name}</span>
        <ProgressBar key={this.props.sound.file + 'progress'} progress={this.props.sound.progress}/>
      </div>
    );
  }
}

DownloadItem.propTypes = {
  sound: PropTypes.shape(soundClass)
};
