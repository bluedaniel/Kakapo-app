import React, { PropTypes } from "react";
import validator from "validator";

export default React.createClass({
  propTypes: {
    img: PropTypes.string
  },
  render() {
    const img = this.props.img;
    // Check if image is a url
    if (!validator.isURL(this.props.img)) {
      // img = path.join(dirname, this.props.img);
    }
    return (
      <img ref="icon" src={img}/>
    );
  }
});
