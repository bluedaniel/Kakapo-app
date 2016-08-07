import React from 'react';
import { classNames } from 'utils/';
import './header.css';

export default ({ settings, themes, toggleMute }) => (
  <header className="header" style={{ backgroundColor: themes.get('primary') }}>
    <span className="toggle-mute" onClick={toggleMute}>
      <span className="hint--right" data-hint={settings.mute ? 'Unmute' : 'Mute'}>
        <i className={classNames(settings.mute ? 'icon-volume_off' : 'icon-volume_up', {
          dark: themes.get('darkUI')
        })} />
      </span>
    </span>
    <div className="logo">
      <h3 className={classNames({ darkUI: themes.get('darkUI') })}>
        <span className="logo-bg icon-img-logo" />
        <span className="logo-text">Kakapo</span>
      </h3>
    </div>
  </header>
);
