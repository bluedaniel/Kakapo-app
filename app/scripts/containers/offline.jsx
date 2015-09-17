import React from "react";
import Radium from "radium";
import { Link } from "react-router";
import { IntlMixin, FormattedMessage } from "react-intl";

export default new Radium(React.createClass({
  mixins: [IntlMixin],
  render() {
    return (
      <div>
        <div className="modal desktop-pane">
          <Link className="close" to="/">{this.getIntlMessage("modal.close")}</Link>
          <h4><FormattedMessage message={this.getIntlMessage("download.header")}/></h4>
          <h5><FormattedMessage message={this.getIntlMessage("download.subheader")}/></h5>
        </div>
        <Link className="modal-bg" to="/"/>
      </div>
    );
  }
}));
