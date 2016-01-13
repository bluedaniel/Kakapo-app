import { ipcRenderer, remote } from 'electron';
import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { settingActions, themeActions } from 'actions/';
import { ColorPicker, Checkbox } from 'components/ui/';
import './settings.css';

let app;
let autoUpdater;

if (__DESKTOP__) {
  app = remote.app;
  autoUpdater = remote.autoUpdater;
}

class Settings extends Component {
  static propTypes = {
    themes: PropTypes.object,
    settingActions: PropTypes.object,
    themeActions: PropTypes.object
  };

  state = {
    updateStatus: false,
    colorPickerActive: false
  };

  componentDidMount() {
    if (__DESKTOP__) {
      autoUpdater
      .on('checking-for-update', () => this.setUpdateStatus({ updateStatus: 'checking' }))
      .on('update-available', () => this.setUpdateStatus({ updateStatus: 'downloading' }))
      .on('update-not-available', () => this.setUpdateStatus({ updateStatus: 'latest' }))
      .on('update-downloaded', () => this.setUpdateStatus({ updateStatus: 'downloaded' }));
    }
  }

  changePaletteSlot = (slotNo) => {
    this.setState({
      colorPickerActive: true,
      slotNo: slotNo,
      defaultColor: this.props.themes.get('palette').get(slotNo)
    });
  };

  handleSwatch = (swatch) => {
    this.setState({ colorPickerActive: false });
    this.props.themeActions.themesChange(swatch, this.state.slotNo);
  };

  setUpdateStatus = (opts) => this.setState(opts);

  checkForUpdates = () => {
    if (!this.state.updateStatus) autoUpdater.checkForUpdates();
    if (this.state.updateStatus === 'downloaded') ipcRenderer.send('application:quit-install');
  };

  toggleDockIcon = (value) => this.props.settingActions.toggleDock(value);

  toggleDevTools = (value) => this.props.settingActions.toggleDevTools(value);

  renderDockOpt() {
    return (
      <div>
        <div className="opt">
          <Checkbox
            checked={this.props.settings.dockIcon}
            handleChange={this.toggleDockIcon}
            label="Show dock icon"
            name="toggle-dock"
            />
        </div>
        <div className="opt">
          <Checkbox
            checked={this.props.settings.devTools}
            handleChange={this.toggleDevTools}
            label="Show developer tools"
            name="toggle-devtools"
            />
        </div>
      </div>
    );
  }

  renderGitRepo() {
    return (
      <div className="opt opt-repo">
        <a
          className="github hint--right"
          data-hint="Fork me on Github!"
          href="https://github.com/bluedaniel/kakapo-app"
          target="_blank"
        >
          <i className="icon-github"/>
        </a>
        {__DESKTOP__ ? (
        <p className="version" onClick={this.checkForUpdates}>
          {!this.state.updateStatus && `Check for update - v${app.getVersion()}`}
          {this.state.updateStatus === 'checking' && 'Checking for updates ...'}
          {this.state.updateStatus === 'downloading' && 'Downloading update ...'}
          {this.state.updateStatus === 'latest' && 'You have the latest version.'}
          {this.state.updateStatus === 'downloaded' && 'Click to restart and update.'}
        </p>) : null}
      </div>
    );
  }

  renderDesktopOpts() {
    return (
      <div>
        {process.platform === 'darwin' ? this.renderDockOpt() : null}
        <div className="opt quit">
          <a onClick={() => ipcRenderer.send('app-quit')}>Quit Kakapo</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="modal settings-pane">
        <div className="modal-inner">
          <div className="opt first">
            <FormattedMessage id="settings.theme"/>
            <span className="swatches">
              <a onClick={() => this.changePaletteSlot(0)} style={{ backgroundColor: this.props.themes.get('palette').get(0) }}></a>
              <a onClick={() => this.changePaletteSlot(1)} style={{ backgroundColor: this.props.themes.get('palette').get(1) }}></a>
            </span>
            <ColorPicker
              active={this.state.colorPickerActive}
              color={this.state.defaultColor}
              handleSwatch={this.handleSwatch}
              />
          </div>
          {__DESKTOP__ ? this.renderDesktopOpts() : null}
          {this.renderGitRepo()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  settingActions: bindActionCreators(settingActions, dispatch),
  themeActions: bindActionCreators(themeActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Settings));
