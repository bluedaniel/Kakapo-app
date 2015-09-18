import Radium from "radium";
import React from "react";
import Reflux from "reflux";
import classNames from "classnames";
import { Link } from "react-router";
import { IntlMixin } from "react-intl";
import { Theme } from "../stores";

export default new Radium(React.createClass({
  mixins: [ IntlMixin, Reflux.connect(Theme, "theme") ],
  render() {
    return (
      <header style={this.state.theme.header.titlebar}>
        <div className="container">
          <div className="titlebar">
            <Link title={this.getIntlMessage("nav.downloads")} to="/downloads">
              <i className={classNames("icon-add", {
                "dark": this.state.theme.darkUI
              })}/>
            </Link>
            <Link className="logo" to="/">
              <h3 style={this.state.theme.header.h3}>
                <img src="/Users/daniellevitt86/Sites/Kakapo/kakapo-app/app/icons/social/kakapo.png"/>
                Kakapo
              </h3>
            </Link>
            <Link title={this.getIntlMessage("nav.settings")} to="/settings">
              <i className={classNames("icon-settings", {
                "dark": this.state.theme.darkUI
              })}/>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}));
