import ipc from "ipc";
import remote from "remote";
import React from "react";
import Reflux from "reflux";
import Rx from "rx";
import { Settings, Sounds, Theme } from "../stores";
import { Header, Nav, SoundList } from "../components";
import "../styles/base.css";

const autoUpdater = remote.require("auto-updater");

export const Konami = Rx.Observable.fromEvent(window, "keyup")
  .map(el => el.keyCode)
  .windowWithCount(10, 1)
  .selectMany(_x => _x.toArray())
  .filter(seq => seq.toString() === [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].toString());

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings") ],
  getInitialState() {
    return {
      updateAvailable: false,
      konami: false
    };
  },
  componentDidMount() {
    ipc.on("application:update-available", this.handleUpdateAvailable);
    autoUpdater.checkForUpdates();

    // Konami!
    Konami.subscribe(this.handleKonami);
  },
  handleUpdateAvailable() {
    this.setState({
      updateAvailable: true
    });
  },
  handleKonami() {
    this.setState({
      konami: !this.state.konami
    });
  },
  handleAutoUpdateClick() {
    ipc.send("application:quit-install");
  },
  render() {
    return (
      <div className="wrapper">
        {this.state.updateAvailable ? <a className="update-now" onClick={this.handleAutoUpdateClick}>Hi, there is a new version of Kakapo!<br/>Click here to update</a> : null}
        <Nav/>
        <Header {...this.state.settings.intlData}/>
        <div className="container">
          <SoundList sounds={this.state.sounds} {...this.state.settings.intlData}/>
          {this.props.children && React.cloneElement(this.props.children, {...this.state.settings.intlData})}
          <aside className="toast-view"></aside>
        </div>
      </div>
    );
  }
});
