import React, { Component, PropTypes } from 'react';
import './progress.css';

export default class Progress extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    progress: PropTypes.number
  };

  render() {
    return (
      <div>
      <div className="progress-barberpole" style={{ width: `${Math.ceil(this.props.progress * 100)}%` }}/>
      <div className="progress-text">{Math.ceil(this.props.progress * 100)}%</div>
      </div>
    );
  }
}
