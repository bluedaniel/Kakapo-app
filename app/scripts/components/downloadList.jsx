import React, { PropTypes } from "react";
import {Map} from "immutable";
import DownloadListItem from "./downloadListItem";

export default React.createClass({
  propTypes: {
    sounds: PropTypes.instanceOf(Map)
  },
  render() {
    return (
      <div>
        <h5>Recently added</h5>
        <div className="download-list">
          {this.props.sounds.toArray().map(_s => <DownloadListItem key={_s.file} {..._s}/>)}
        </div>
      </div>
    );
  }
});
