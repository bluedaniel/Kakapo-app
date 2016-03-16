import React from 'react';
import { soundActions, settingActions } from 'actions/';
import { classNames, camelCase } from 'utils/';
import './header.css';

export default ({ settings, themes, dispatch }) => {
  const toggleMute = () => {
    dispatch(settingActions.toggleMute());
    dispatch(soundActions.soundsMute(!settings.mute));
  };

  return (
    <header
      className={classNames('header', { hideHint: camelCase(location.pathname).length })}
      style={{ backgroundColor: themes.get('primary') }}
    >
      <span
        className="toggle-mute hint--right"
        data-hint={settings.mute ? 'Unmute' : 'Mute'}
        onClick={toggleMute}
      >
        <i className={classNames(settings.mute ? 'icon-volume_off' : 'icon-volume_up', {
          dark: themes.get('darkUI')
        })}
        />
    </span>
      <div className="logo" to="/">
        <h3 className={classNames({ darkUI: themes.get('darkUI') })}>
          <span className="logo-bg icon-img-logo"></span>
          <span className="logo-text">Kakapo</span>
        </h3>
      </div>
    </header>
  );
};
