import { PropTypes } from "react";

export default {
  desc: PropTypes.string,
  duration: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  tags: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  viewCount: PropTypes.number
};
