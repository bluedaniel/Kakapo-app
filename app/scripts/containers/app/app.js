import React from 'react';
import { hot } from 'react-hot-loader';
import { keys, length, map, pick, pipe, prop } from 'ramda';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { ipcRenderer } from 'electron';
import Dropzone from 'react-dropzone';
import { opacify } from 'polished';
import { soundActions, settingActions, notifyActions } from 'actions/';
import { Header, Nav, SoundList, DownloadList } from 'components/';
import Notifications from 'components/ui/notifications/notifications';
import Subroutes from 'components/ui/subroutes/subroutes';
import { cx } from 'utils/';
import './app.css';

const renderUpload = () => (
  <div className="uploadFiles">
    <div className="inner">
      <h3>
        <i className="icon-add" />
      </h3>
      <p className="text">Drop files to upload</p>
    </div>
  </div>
);

const renderLoading = themes => (
  <div
    className="loading"
    style={{
      background: pipe(
        prop('primary'),
        x => opacify(0.5, x)
      )(themes),
    }}
  >
    <div className="sk-fading-circle">
      {Array.from(new Array(12), (x, i) => i + 1).map(a => (
        <div className={`sk-circle${a} sk-circle`} key={`sk-circle${a}`} />
      ))}
    </div>
  </div>
);

const App = ({
  notifications,
  settings,
  sounds,
  themes,
  dispatch,
  onDrop,
  onToggleMute,
  router,
}) => (
  <div
    className={cx('app-container', {
      web: __WEB__,
      desktop: __DESKTOP__,
    })}
  >
    <Dropzone
      activeClassName="activeDrop"
      className="inactiveDrop"
      onDrop={onDrop}
      disableClick
    >
      <Nav {...{ themes }} />

      <Subroutes {...{ router }} />

      <div className="main-panel">
        {__DESKTOP__ ? renderUpload() : null}

        {settings.updateStatus === 'downloaded' ? (
          <a
            className="update-now"
            onClick={() => ipcRenderer.send('application:quit-install')}
          >
            Hi, there is a new version of Kakapo!
            <br />
            Click here to update
          </a>
        ) : null}

        <Header {...{ settings, themes, onToggleMute }} />

        {pipe(
          keys,
          length
        )(sounds) ? (
          <SoundList {...{ sounds, themes, dispatch }} />
        ) : (
          renderLoading(themes)
        )}

        <Notifications {...{ notifications }} />
        <DownloadList {...{ sounds }} />
      </div>
    </Dropzone>
  </div>
);

const mapStateToProps = pick([
  'notifications',
  'settings',
  'sounds',
  'search',
  'themes',
  'router',
]);

export default pipe(
  hot(module),
  withHandlers({
    onDrop: ({ dispatch }) => files =>
      map(x => dispatch(soundActions.addLocal(x)), files),
    onToggleMute: ({ dispatch }) => () => {
      dispatch(settingActions.mute());
      dispatch(soundActions.mute());
    },
  }),
  // Connect to redux stores
  connect(mapStateToProps)
)(App);
