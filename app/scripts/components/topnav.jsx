import Radium from "radium";
import React from "react";
import Reflux from "reflux";
import classNames from "classnames";
import { Link } from "react-router";
import { IntlMixin } from "react-intl";
import { soundActions } from "../actions";
import { Theme } from "../stores";

export default new Radium(React.createClass({
  mixins: [ IntlMixin, Reflux.connect(Theme, "theme") ],
  getInitialState() {
    return { mute: false };
  },
  handleMute() {
    this.setState({ mute: !this.state.mute }, () => soundActions.toggleMute(this.state.mute));
  },
  render() {
    return (
      <div className={classNames("topbar", {
          "dark": this.state.theme.darkUI
        })} style={this.state.theme.header.download}>
        <span className={classNames("mute", {
          "muted": this.state.mute,
          "dark": this.state.theme.darkUI
        })} onClick={this.handleMute}/>
        <Link className="download-app" to="/desktop">
          {this.getIntlMessage("nav.app")}
        </Link>
        <a className="facebook" href="https://www.facebook.com/dialog/share?app_id=1663218660581932&redirect_uri=http://kakapo.co&href=http://kakapo.co" target="_blank"/>
        <a className="twitter" href="https://twitter.com/intent/tweet?text=Kakapo&url=http://kakapo.co" target="_blank"/>
        <a className="email" href="mailto:?subject=Kakapo&body=http://kakapo.co" target="_blank"/>
        <a className="github" href="http://github.com/bluedaniel/kakapo-web" target="_blank"/>
      </div>
    );
  }
}));
