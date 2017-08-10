import React from 'react';
import { compose, keys, length, pick, prop } from 'ramda';
import { connect } from 'react-redux';
import { lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import Dropzone from 'react-dropzone';
import { injectIntl } from 'react-intl';
import color from 'color';
import { soundActions, settingActions, notifyActions } from 'actions/';
import { Header, Nav, SoundList, DownloadList } from 'components/';
import Notifications from 'components/ui/notifications/notifications';
import Subroutes from 'components/ui/subroutes/subroutes';
import { cx } from 'utils/';
import './app.css';

const renderUpload = () =>
  <div className="uploadFiles">
    <div className="inner">
      <h3>
        <i className="icon-add" />
      </h3>
      <p className="text">Drop files to upload</p>
    </div>
  </div>;

const renderLoading = themes =>
  <div
    className="loading"
    style={{
      background: color(prop('primary', themes)).alpha(0.5).toString()
    }}
  >
    <div className="sk-fading-circle">
      {Array.from(new Array(12), (x, i) => i + 1).map(a =>
        <div className={`sk-circle${a} sk-circle`} key={`sk-circle${a}`} />
      )}
    </div>
  </div>;

const App = props => {
  const {
    notifications,
    settings,
    sounds,
    themes,
    intl,
    dispatch,
    onDrop,
    onToggleMute
  } = props;

  return (
    <div
      className={cx('app-container', {
        web: __WEB__,
        desktop: __DESKTOP__
      })}
    >
      <Dropzone
        activeClassName="activeDrop"
        className="inactiveDrop"
        onDrop={onDrop}
        disableClick
      >
        <Nav {...{ themes, intl }} />

        <Subroutes {...props} />

        <div className="main-panel">
          {__DESKTOP__ ? renderUpload() : null}

          {settings.updateStatus === 'downloaded'
            ? <a
                className="update-now"
                onClick={() => ipcRenderer.send('application:quit-install')}
              >
                Hi, there is a new version of Kakapo!<br />Click here to update
              </a>
            : null}

          <Header {...{ settings, themes, onToggleMute }} />

          {compose(length, keys)(sounds)
            ? <SoundList {...{ sounds, themes, intl, dispatch }} />
            : renderLoading(themes)}

          <Notifications {...{ notifications }} />
          <DownloadList {...{ sounds }} />
        </div>
      </Dropzone>
    </div>
  );
};

const mapStateToProps = pick([
  'notifications',
  'settings',
  'sounds',
  'search',
  'themes',
  'routing'
]);

export default compose(
  withRouter, // Add routing props
  connect(mapStateToProps), // Connect to redux stores
  injectIntl, // Add i18n
  lifecycle({
    componentDidMount() {
      this.props.dispatch(soundActions.soundsInit());
    }
  }),
  withHandlers({
    onDrop: ({ dispatch }) => files => {
      /* istanbul ignore if */
      if (__DESKTOP__) {
        files.map(_f => dispatch(soundActions.addLocalSound(_f.name, _f.path)));
      } else {
        dispatch(
          notifyActions.send(
            'You can only add desktop files with the Kakapo desktop app.'
          )
        );
      }
    },
    onToggleMute: ({ dispatch }) => () => {
      dispatch(settingActions.toggleMute());
      dispatch(soundActions.soundsMute());
    }
  })
)(App);
