import { PropTypes } from "react";

export default {
  editing: PropTypes.bool,
  file: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  recentlyDownloaded: PropTypes.bool,
  source: PropTypes.string.isRequired,
  tags: PropTypes.string,
  volume: PropTypes.number.isRequired
};
