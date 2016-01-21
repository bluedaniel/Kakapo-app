import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';
import fs from 'fs-extra';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { soundActions } from 'actions/';
import { Header, Nav, SoundList, DownloadList } from 'components/';
import { pathConfig, toasterInstance } from 'utils/';
import 'styles/base.css';
import './app.css';

let autoUpdater;
if (__DESKTOP__) autoUpdater = remote.autoUpdater;

let gradients;
if (__DESKTOP__) gradients = fs.readJsonSync(pathConfig.gradientFile);

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    soundActions: PropTypes.object
  };

  state = __DESKTOP__ ? {
    updateAvailable: false,
    gradient: gradients[Math.floor(Math.random() * gradients.length)]
  } : {};

  componentDidMount() {
    this.props.soundActions.soundsInit();

    if (__DESKTOP__) {
      ipcRenderer.on('application:update-available', this.handleUpdateAvailable);
      autoUpdater.checkForUpdates();
    }
  }

  onDrop = (files) => { // Desktop only
    if (__DESKTOP__) {
      files.map(_f => this.props.soundActions.addLocalSound(_f.name, _f.path));
    } else {
      toasterInstance().then(_t => _t.toast('You can only add desktop files with the Kakapo desktop app.'));
    }
  };

  // Desktop only
  handleUpdateAvailable = () => this.setState({ updateAvailable: true });

  // Desktop only
  handleAutoUpdateClick = () => ipcRenderer.send('application:quit-install');

  renderUpload() {
    return (
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
    );
  }

  render() {
    return (
      <div className={classNames('app-container', {
        web: __WEB__,
        desktop: __DESKTOP__
      })}>
        <Dropzone
          activeClassName="activeDrop"
          className="inactiveDrop"
          disableClick
          onDrop={this.onDrop}
        >
          {__DESKTOP__ ? this.renderUpload() : null}
          {this.state.updateAvailable ? <a className="update-now" onClick={this.handleAutoUpdateClick}>Hi, there is a new version of Kakapo!<br/>Click here to update</a> : null}
          <Nav/>
          <Header/>
          <div className="container">
            {this.props.children && React.cloneElement(this.props.children)}
            {this.props.children ? (<Link className="modal-bg" to="/"/>) : null}
          </div>
          <SoundList/>
          <aside className="toast-view"></aside>
          <DownloadList/>
        </Dropzone>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default connect(() => ({}), mapDispatchToProps)(App);
