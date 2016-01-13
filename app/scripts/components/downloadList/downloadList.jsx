import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { DownloadItem } from 'components';
import './downloadList.css';

export default class DownloadList extends Component {
  static propTypes = {
    sounds: PropTypes.instanceOf(Map)
  };

  render() {
    const downloads = this.props.sounds.toArray().filter(_s => _s.progress < 1);
    if (!downloads) return null;
    return (
      <div className="download-list">
        {downloads.map(_s => <DownloadItem key={_s.file} sound={{ ..._s }}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sounds: state.sounds
});

export default connect(mapStateToProps)(DownloadList);
