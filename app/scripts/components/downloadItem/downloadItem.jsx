import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import classNames from 'classnames';
import { soundClass } from '../../classes';
import { ProgressBar } from '../ui';

export default class DownloadItem extends Component {
  constructor(props) {
    super(props);
  }

  renderProgress() {
    if (this.props.progress === 1) {
      return (
        <div className="animated bounceInUp" key={this.props.file + 'done'}>
          <i className="icon-tick"/>
        </div>);
    }

    return <ProgressBar key={this.props.file + 'progress'} progress={this.props.progress}/>;
  }

  render() {
    let img = this.props.img;
    if (this.props.source === 'file') img = `http://data.kakapo.co/v2/images/dark_${img}.png`;
    return (
      <div className={classNames('download', { active: this.props.progress < 1 })}>
        <div className="preview" style={{ backgroundImage: `url(${img})` }}/>
        <span className="title">{this.props.name}</span>
        <TransitionGroup>
          {this.renderProgress()}
        </TransitionGroup>
      </div>
    );
  }
}

DownloadItem.propTypes = soundClass;
