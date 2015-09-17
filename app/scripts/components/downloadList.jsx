import React, { PropTypes } from "react";
import DownloadListItem from "./downloadListItem";
import SoundClass from "../classes/sound";

export default React.createClass({
  propTypes: {
    sounds: PropTypes.arrayOf(PropTypes.shape(SoundClass))
  },
  render() {
    return (
      <div>
        <h5>Recently added</h5>
        <div className="download-list">
          {this.props.sounds.map(s => <DownloadListItem key={s.file} {...s}/>)}
        </div>
      </div>
    );
  }
});
