import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import Dropzone from 'react-dropzone';
import { injectIntl } from 'react-intl';
import color from 'color';
import { soundActions, settingActions, notifyActions } from 'actions/';
import { Header, Nav, SoundList, DownloadList } from 'components/';
import { Notifications, Subroutes } from 'components/ui';
import { classNames } from 'utils/';
import './app.css';

const App = (props) => {
  const { notifications, settings, sounds, themes, intl, dispatch } = props;

  if (!settings.initialRender) {
    dispatch(settingActions.initialRender());
    dispatch(soundActions.soundsInit());
  }

  const onDrop = (files) => {
    /* istanbul ignore if */
    if (__DESKTOP__) {
      files.map(_f => dispatch(soundActions.addLocalSound(_f.name, _f.path)));
    } else {
      dispatch(notifyActions.send('You can only add desktop files with the Kakapo desktop app.'));
    }
  };

  const renderUpload = () => (
    <div className="uploadFiles">
      <div className="inner">
        <h3><i className="icon-add"></i></h3>
        <p className="text">Drop files to upload</p>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="loading" style={{
      background: color(themes.get('primary')).alpha(0.5).rgbaString()
    }}
    >
      <div className="sk-fading-circle">
        {Array.from(new Array(12), (x, i) => i + 1).map(a => (
          <div className={`sk-circle${a} sk-circle`} key={`sk-circle${a}`} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={classNames('app-container', { web: __WEB__, desktop: __DESKTOP__ })}>
      <Dropzone activeClassName="activeDrop" className="inactiveDrop" disableClick
        onDrop={onDrop}
      >
        <Nav {...{ themes, intl }} />

        <Subroutes {...props} />

        <div className="main-panel">
          {__DESKTOP__ ? renderUpload() : null}

          {settings.updateStatus === 'downloaded' ?
            <a className="update-now" onClick={() => ipcRenderer.send('application:quit-install')}>
            Hi, there is a new version of Kakapo!<br />Click here to update</a> : null}

          <Header {...{ settings, themes, intl, dispatch }} />

          {sounds.count() ? <SoundList {...{ sounds, themes, intl, dispatch }} /> :
            renderLoading()}

          <Notifications {...{ notifications }} />
          <DownloadList {...{ sounds }} />
        </div>
      </Dropzone>
    </div>
  );
};

export default injectIntl(connect(state => ({
  notifications: state.notifications,
  settings: state.settings,
  sounds: state.sounds,
  search: state.search,
  themes: state.themes
}))(App));
