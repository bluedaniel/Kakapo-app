import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { DownloadItem } from '../';
import './downloadList.css';

export default class DownloadList extends Component {
  static propTypes = {
    sounds: PropTypes.instanceOf(Map)
  };

  render() {
    const downloads = this.props.sounds.toArray().filter(_s => _s.recentlyDownloaded);
    return (
      <div>
        {downloads.length ? <h5>Recently added</h5> : null}
        <div className="download-list">
          {downloads.map(_s => <DownloadItem key={_s.file} sound={{ ..._s }}/>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sounds: state.sounds
});

export default connect(mapStateToProps)(DownloadList);
