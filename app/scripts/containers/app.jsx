import ipc from "ipc";
import remote from "remote";
import React from "react";
import Reflux from "reflux";
import Rx from "rx";
import { Settings, Sounds, Theme } from "../stores";
import { Header, Topnav, SoundList } from "../components";

var autoUpdater = remote.require("auto-updater");

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings") ],
  getInitialState: function () {
    return {
      updateAvailable: false
    };
  },
  componentDidMount() {
    ipc.on("application:update-available", this.setUpdateAvailable);
    autoUpdater.checkForUpdates();

    // Konami!
    Rx.Observable.fromEvent(window, "keyup")
      .map(e => e.keyCode)
      .windowWithCount(10, 1)
      .selectMany(x => x.toArray())
      .filter(seq => seq.toString() === [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].toString())
      .subscribe(() => console.log("Konami!"));
  },
  setUpdateAvailable() {
    this.setState({
      updateAvailable: true
    });
  },
  handleAutoUpdateClick() {
    ipc.send("application:quit-install");
  },
  render() {
    return (
      <div className="wrapper">
        {this.state.updateAvailable ? <a className="update-now" onClick={this.handleAutoUpdateClick}>Hi, there is a new version of Kakapo!<br/>Click here to update</a> : null}
        <Topnav/>
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
