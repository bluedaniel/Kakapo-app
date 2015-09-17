import React, { PropTypes } from "react";

export default React.createClass({
  propTypes: {
    progress: PropTypes.number
  },
  componentWillLeave(cb) {
    let bar = this.refs.bar;
    bar.addEventListener("transitionend", () => {
      bar.className += " animated bounceOut";
      bar.addEventListener("animationend", () => {
        cb();
      });
    });
  },
  render() {
    return (
      <div className="progress-bar">
        <div
          className="bar"
          ref="bar"
          style={{transform: "translate3d(-" + (100 - (this.props.progress * 100)) + "%, 0px, 0px)"}}>
          <div className="peg"></div>
        </div>
      </div>
    );
  }
});
