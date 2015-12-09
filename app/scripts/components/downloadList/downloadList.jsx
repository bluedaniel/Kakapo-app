import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { DownloadItem } from '../';
import './downloadList.css';

export default class DownloadList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5>Recently added</h5>
        <div className="download-list">
          {this.props.sounds.toArray().map(_s => <DownloadItem key={_s.file} {..._s}/>)}
        </div>
      </div>
    );
  }
}

DownloadList.propTypes = {
  sounds: PropTypes.instanceOf(Map)
};
