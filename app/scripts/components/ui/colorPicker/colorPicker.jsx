import React, { PropTypes } from "react";
import classNames from "classnames";
import swatches from "../../../utils/swatches";
import "./colorPicker.css";

export default React.createClass({
  propTypes: {
    active: PropTypes.bool,
    color: PropTypes.string,
    handleSwatch: PropTypes.func
  },
  render() {
    return (
      <div className={classNames("color-picker", {"active": this.props.active})}>
        {swatches.all().map(swatch =>
          <div key={swatch} onClick={() => this.props.handleSwatch(swatch)} style={{backgroundColor: swatch}}></div>, this)}
      </div>
    );
  }
});
