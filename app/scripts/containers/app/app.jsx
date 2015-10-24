import ipc from "ipc";
import fs from "fs-extra";
import remote from "remote";
import React from "react";
import Reflux from "reflux";
import Dropzone from "react-dropzone";
import { soundActions } from "../../actions";
import { Settings, Sounds } from "../../stores";
import { Header, Nav, SoundList } from "../../components";
import { pathConfig } from "../../utils";
import "../../styles/base.css";
import "./app.css";

const autoUpdater = remote.require("auto-updater");

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Settings, "settings") ],
  getInitialState() {
    const gradients = JSON.parse(fs.readFileSync(pathConfig.gradientFile));
    return {
      updateAvailable: false,
      gradient: gradients[Math.floor(Math.random() * gradients.length)]
    };
  },
  componentDidMount() {
    ipc.on("application:update-available", this.handleUpdateAvailable);
    autoUpdater.checkForUpdates();
  },
  onDrop(files) {
    files.map(_f => soundActions.getCustomFile(_f.name, _f.path));
  },
  handleUpdateAvailable() {
    this.setState({
      updateAvailable: true
    });
  },
  handleAutoUpdateClick() {
    ipc.send("application:quit-install");
  },
  render() {
    return (
      <Dropzone
        className="inactiveDrop"
        activeClassName="activeDrop"
        disableClick onDrop={this.onDrop}
      >
        <div
          className="upload-files"
          style={{
            background: `linear-gradient(90deg, ${this.state.gradient.colors[0]} 10%, ${this.state.gradient.colors[1]} 90%)`
          }}
        >
          <div className="inner">
            <h3><i className="icon-add"></i></h3>
            <p className="text">Drop files to upload</p>
            <a className="gradient-name" href="http://uigradients.com" target="_blank">
              Gradient: {this.state.gradient.name}
            </a>
          </div>
        </div>
        {this.state.updateAvailable ? <a className="update-now" onClick={this.handleAutoUpdateClick}>Hi, there is a new version of Kakapo!<br/>Click here to update</a> : null}
        <Nav/>
        <Header {...this.state.settings.intlData}/>
        <div className="container">
          <SoundList sounds={this.state.sounds} {...this.state.settings.intlData}/>
          {this.props.children && React.cloneElement(this.props.children, {...this.state.settings.intlData})}
          <aside className="toast-view"></aside>
        </div>
      </Dropzone>
    );
  }
});
