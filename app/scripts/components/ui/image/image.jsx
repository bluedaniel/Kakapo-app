import React, { PropTypes } from "react";

export default React.createClass({
  propTypes: {
    img: PropTypes.string
  },
  render() {
    const img = this.props.img;
    return (
      <img ref="icon" src={img}/>
    );
  }
});
