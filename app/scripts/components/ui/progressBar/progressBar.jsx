import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './progressBar.css';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    progress: PropTypes.number
  };

  componentWillLeave(cb) {
    const bar = this.refs.bar;
    bar.addEventListener('transitionend', () => {
      bar.className += ' animated bounceOut';
      bar.addEventListener('animationend', () => cb());
    });
  }

  render() {
    return (
      <div className={classNames('progress-bar', {
        finish: this.props.progress === 1
      })}>
        <div
          className="bar"
          ref="bar"
          style={{ transform: 'translate3d(-' + (100 - (this.props.progress * 100)) + '%, 0px, 0px)' }}
        >
          <div className="peg"></div>
        </div>
      </div>
    );
  }
}
