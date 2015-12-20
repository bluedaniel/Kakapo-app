import { PropTypes } from 'react';

export default {
  desc: PropTypes.string,
  duration: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  tags: PropTypes.string,
  scId: PropTypes.number.isRequired,
  userAvatar: PropTypes.string,
  viewCount: PropTypes.number
};
