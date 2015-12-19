import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';
import fs from 'fs-extra';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { soundActions } from '../../actions';
import { Header, Nav, SoundList } from '../../components';
import { konami, pathConfig } from '../../utils';
import { DevTools } from '../';
import '../../styles/base.css';
import './app.css';

let autoUpdater;
if (__DESKTOP__) autoUpdater = remote.autoUpdater;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { konami: false };

    if (__DESKTOP__) {
      const gradients = fs.readJsonSync(pathConfig.gradientFile);
      this.state = { ...this.state, ...{
        updateAvailable: false,
        gradient: gradients[Math.floor(Math.random() * gradients.length)]
      } };
    }
  }

  static propTypes = {
    children: PropTypes.object,
    soundActions: PropTypes.object
  }

  componentDidMount() {
    this.props.soundActions.soundsInit();
    konami.subscribe(this.konamiEntered);

    if (__DESKTOP__) {
      ipcRenderer.on('application:update-available', this.handleUpdateAvailable);
      autoUpdater.checkForUpdates();
    }
  }

  konamiEntered() {
    this.setState({ konami: !this.state.konami });
  }

  onDrop(files) { // Desktop only
    files.map(_f => soundActions.getCustomFile(_f.name, _f.path));
  }

  handleUpdateAvailable() { // Desktop only
    this.setState({ updateAvailable: true });
  }

  handleAutoUpdateClick() { // Desktop only
    ipcRenderer.send('application:quit-install');
  }

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
          className="inactiveDrop"
          activeClassName="activeDrop"
          disableClick onDrop={this.onDrop}
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
          {__DEV__ ? <DevTools/> : null}
        </Dropzone>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default connect(() => ({}), mapDispatchToProps)(App);
