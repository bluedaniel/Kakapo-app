import React from 'react';
import { pick } from 'ramda';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import Dropzone from 'react-dropzone';
import { injectIntl } from 'react-intl';
import color from 'color';
import { soundActions, settingActions, notifyActions } from 'actions/';
import { Header, Nav, SoundList, DownloadList } from 'components/';
import Notifications from 'components/ui/notifications/notifications';
import Subroutes from 'components/ui/subroutes/subroutes';
import { classNames } from 'utils/';
import './app.css';

const App = props => {
  const { notifications, settings, sounds, themes, intl, dispatch } = props;

  if (!settings.initialRender) {
    dispatch(settingActions.initialRender());
    dispatch(soundActions.soundsInit());
  }

  const onDrop = files => {
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
  };

  const renderUpload = () =>
    <div className="uploadFiles">
      <div className="inner">
        <h3>
          <i className="icon-add" />
        </h3>
        <p className="text">Drop files to upload</p>
      </div>
    </div>;

  const renderLoading = () =>
    <div
      className="loading"
      style={{
        background: color(themes.get('primary')).alpha(0.5).toString()
      }}
    >
      <div className="sk-fading-circle">
        {Array.from(new Array(12), (x, i) => i + 1).map(a =>
          <div className={`sk-circle${a} sk-circle`} key={`sk-circle${a}`} />
        )}
      </div>
    </div>;

  const toggleMute = () => {
    dispatch(settingActions.toggleMute());
    dispatch(soundActions.soundsMute());
  };

  return (
    <div
      className={classNames('app-container', {
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

          <Header {...{ settings, themes, toggleMute }} />

          {sounds.count()
            ? <SoundList {...{ sounds, themes, intl, dispatch }} />
            : renderLoading()}

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

const IntlApp = injectIntl(App);

export default withRouter(connect(mapStateToProps)(IntlApp));
