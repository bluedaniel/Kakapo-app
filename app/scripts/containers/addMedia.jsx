import React from "react";
import Reflux from "reflux";
import { IntlMixin } from "react-intl";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router";
import { Settings } from "../stores";

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ IntlMixin, Reflux.connect(Settings, "settings") ],
  render() {
    let routeName = window.location.hash.substr(1).split("/").join(" ") || "";
    return (
      <CSSTransitionGroup
        component="div"
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionName="modal">
        {routeName ? <Link className="modal-bg" to="/"/> : ""}
        <div className={"modal " + routeName} key={routeName}>
          <Link className="close" to="/">{this.getIntlMessage("modal.close")}</Link>
          {React.cloneElement(this.props.children, {...this.state.settings.intlData})}
        </div>
      </CSSTransitionGroup>
    );
  }
});
