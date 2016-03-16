import { ipcRenderer, remote } from 'electron';
import React, { Component, PropTypes } from 'react';
import { intlShape } from 'react-intl';
import { settingActions, themeActions } from 'actions/';
import { ColorPicker, Checkbox } from 'components/ui/';
import './settings.css';

let app;
let autoUpdater;

/* istanbul ignore if */
if (__DESKTOP__) {
  app = remote.app;
  autoUpdater = remote.autoUpdater;
}

export default class Settings extends Component {
  static propTypes = {
    themes: PropTypes.object,
    settings: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  state = {
    updateStatus: false,
    colorPickerActive: false
  };

  componentDidMount() {
    /* istanbul ignore if */
    if (__DESKTOP__) {
      autoUpdater
      .on('checking-for-update', () => this.setUpdateStatus({ updateStatus: 'checking' }))
      .on('update-available', () => this.setUpdateStatus({ updateStatus: 'downloading' }))
      .on('update-not-available', () => this.setUpdateStatus({ updateStatus: 'latest' }))
      .on('update-downloaded', () => this.setUpdateStatus({ updateStatus: 'downloaded' }));
    }
  }

  setUpdateStatus = (opts) => this.setState(opts);

  handleSwatch = (swatch) => {
    this.setState({ colorPickerActive: false });
    this.props.dispatch(themeActions.themesChange(swatch, this.state.slotNo));
  };

  changePaletteSlot = (slotNo) => {
    this.setState({
      colorPickerActive: true,
      slotNo,
      defaultColor: slotNo ? this.props.themes.get('primary') : this.props.themes.get('btn')
    });
  };

  checkForUpdates = () => {
    if (!this.state.updateStatus) autoUpdater.checkForUpdates();
    if (this.state.updateStatus === 'downloaded') ipcRenderer.send('application:quit-install');
  };

  renderDockOpt() {
    return (
      <div>
        <div className="opt">
          <Checkbox
            checked={this.props.settings.dockIcon}
            handleChange={settingActions.toggleDock}
            label="Show dock icon"
            name="toggle-dock"
            dispatch={this.props.dispatch}
          />
        </div>
        <div className="opt">
          <Checkbox
            checked={this.props.settings.devTools}
            handleChange={settingActions.toggleDevTools}
            label="Show developer tools"
            name="toggle-devtools"
            dispatch={this.props.dispatch}
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
          <i className="icon-img-github" />
        </a>
        {__DESKTOP__ && !__DEV__ ? (
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
            {this.props.intl.formatMessage({ id: 'settings.theme' })}
            <span className="swatches">
              <a onClick={() => this.changePaletteSlot(0)}
                style={{ backgroundColor: this.props.themes.get('primary') }}
              />
              <a onClick={() => this.changePaletteSlot(1)}
                style={{ backgroundColor: this.props.themes.get('btn') }}
              />
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
