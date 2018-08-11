import React from 'react';
import { FormattedMessage } from 'react-intl';
import { pathOr, pick, pipe, prop, propOr } from 'ramda';
import { connect } from 'react-redux';
import { ipcRenderer, remote } from 'electron';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { settingActions, themeActions } from 'actions/';
import { openLink } from 'utils/';
import Checkbox from '../ui/checkbox/checkbox';
import ColorPicker from '../ui/colorPicker/colorPicker';
import './settings.css';

const Settings = ({ settings, themes, dispatch, router }) => {
  const palette = pipe(
    pathOr('', ['location', 'search']),
    queryString.parse,
    propOr(0, 'palette')
  )(router);

  /* istanbul ignore if */
  if (__DESKTOP__) {
    const updateStatus = x => () => dispatch(settingActions.update(x));
    remote.autoUpdater
      .on('checking-for-update', updateStatus('checking'))
      .on('update-available', updateStatus('downloading'))
      .on('update-not-available', updateStatus('latest'))
      .on('update-downloaded', updateStatus('downloaded'));
  }

  const handleSwatch = swatch => {
    dispatch(themeActions.change(swatch, palette - 1));
    dispatch(push('/settings'));
  };

  const checkForUpdates = () => {
    if (!settings.updateStatus) remote.autoUpdater.checkForUpdates();
    if (settings.updateStatus === 'downloaded')
      ipcRenderer.send('application:quit-install');
  };

  const renderDockOpt = () => (
    <div>
      <div className="opt">
        <Checkbox
          checked={settings.dockIcon}
          handleChange={settingActions.dock}
          label="Show dock icon"
          name="toggle-dock"
          dispatch={dispatch}
        />
      </div>
      <div className="opt">
        <Checkbox
          checked={settings.devTools}
          handleChange={settingActions.devtools}
          label="Show developer tools"
          name="toggle-devtools"
          dispatch={dispatch}
        />
      </div>
    </div>
  );

  // && !__DEV__

  const renderGitRepo = () => (
    <div className="opt opt-repo">
      <a
        className="github hint--right"
        data-hint="Fork me on Github!"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/bluedaniel/kakapo-app"
        onClick={e => openLink(e, 'https://github.com/bluedaniel/kakapo-app')}
      >
        <i className="icon-img-github" />
      </a>
      {__DESKTOP__ && !__DEV__ ? (
        <a
          className="version"
          tabIndex="0"
          role="link"
          onClick={checkForUpdates}
        >
          {!settings.updateStatus &&
            `Check for update - v${remote.app.getVersion()}`}
          {settings.updateStatus === 'checking' && 'Checking for updates ...'}
          {settings.updateStatus === 'downloading' && 'Downloading update ...'}
          {settings.updateStatus === 'latest' && 'You have the latest version.'}
          {settings.updateStatus === 'downloaded' &&
            'Click to restart and update.'}
        </a>
      ) : null}
    </div>
  );

  const renderDesktopOpts = () => (
    <div>
      {process.platform === 'darwin' ? renderDockOpt() : null}
      <div className="opt quit">
        <a
          role="link"
          tabIndex="0"
          onClick={() => ipcRenderer.send('app-quit')}
        >
          Quit Kakapo
        </a>
      </div>
    </div>
  );

  return (
    <div className="settings-pane">
      <div className="opt first">
        <FormattedMessage id="settings.theme" />
        <span className="swatches">
          <Link
            to="/settings?palette=1"
            style={{ backgroundColor: prop('primary', themes) }}
          />
          <Link
            to="/settings?palette=2"
            style={{ backgroundColor: prop('btn', themes) }}
          />
        </span>
        <ColorPicker active={palette} handleSwatch={handleSwatch} />
      </div>
      {__DESKTOP__ ? renderDesktopOpts() : null}
      {renderGitRepo()}
    </div>
  );
};

const mapStateToProps = pick(['settings', 'themes', 'router']);

export default connect(mapStateToProps)(Settings);
