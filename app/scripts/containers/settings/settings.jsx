import React, { PropTypes } from 'react';
import { ipcRenderer, remote } from 'electron';
import { Link } from 'react-router';
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

export default function Settings({ settings, themes, location, intl, dispatch }, { router }) {
  const { palette } = location.query;

  /* istanbul ignore if */
  if (__DESKTOP__) {
    autoUpdater
    .on('checking-for-update', () => dispatch(settingActions.desktopUpdate('checking')))
    .on('update-available', () => dispatch(settingActions.desktopUpdate('downloading')))
    .on('update-not-available', () => dispatch(settingActions.desktopUpdate('latest')))
    .on('update-downloaded', () => dispatch(settingActions.desktopUpdate('downloaded')));
  }

  const handleSwatch = (swatch) => {
    dispatch(themeActions.themesChange(swatch, palette - 1));
    router.push('/settings');
  };

  const checkForUpdates = () => {
    if (!settings.updateStatus) autoUpdater.checkForUpdates();
    if (settings.updateStatus === 'downloaded') ipcRenderer.send('application:quit-install');
  };

  const renderDockOpt = () => (
    <div>
      <div className="opt">
        <Checkbox checked={settings.dockIcon} handleChange={settingActions.toggleDock}
          label="Show dock icon" name="toggle-dock" dispatch={dispatch} />
      </div>
      <div className="opt">
        <Checkbox checked={settings.devTools} handleChange={settingActions.toggleDevTools}
          label="Show developer tools" name="toggle-devtools" dispatch={dispatch} />
      </div>
    </div>
  );

  // && !__DEV__

  const renderGitRepo = () => (
    <div className="opt opt-repo">
      <a className="github hint--right" data-hint="Fork me on Github!"
        href="https://github.com/bluedaniel/kakapo-app" target="_blank">
        <i className="icon-img-github" />
      </a>
      {__DESKTOP__ && !__DEV__ ? (
        <p className="version" onClick={checkForUpdates}>
          {!settings.updateStatus && `Check for update - v${app.getVersion()}`}
          {settings.updateStatus === 'checking' && 'Checking for updates ...'}
          {settings.updateStatus === 'downloading' && 'Downloading update ...'}
          {settings.updateStatus === 'latest' && 'You have the latest version.'}
          {settings.updateStatus === 'downloaded' && 'Click to restart and update.'}
        </p>) : null}
    </div>
  );

  const renderDesktopOpts = () => (
    <div>
      {process.platform === 'darwin' ? renderDockOpt() : null}
      <div className="opt quit">
        <a onClick={() => ipcRenderer.send('app-quit')}>Quit Kakapo</a>
      </div>
    </div>
  );

  return (
    <div className="settings-pane">
      <div className="opt first">
        {intl.formatMessage({ id: 'settings.theme' })}
        <span className="swatches">
          <Link to="/settings?palette=1" style={{ backgroundColor: themes.get('primary') }} />
          <Link to="/settings?palette=2" style={{ backgroundColor: themes.get('btn') }} />
        </span>
        <ColorPicker active={palette} handleSwatch={handleSwatch} />
      </div>
      {__DESKTOP__ ? renderDesktopOpts() : null}
      {renderGitRepo()}
    </div>
  );
}

Settings.contextTypes = { router: PropTypes.object };
