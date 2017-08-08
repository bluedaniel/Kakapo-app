import React from 'react';
import { prop } from 'ramda';
import { classNames } from 'utils/';
import './header.css';

export default ({ settings, themes, toggleMute }) =>
  <header
    className="header"
    style={{ backgroundColor: prop('primary', themes) }}
  >
    <span className="toggle-mute" onClick={toggleMute}>
      <span
        className="hint--right"
        data-hint={settings.mute ? 'Unmute' : 'Mute'}
      >
        <i
          className={classNames(
            settings.mute ? 'icon-volume_off' : 'icon-volume_up',
            {
              dark: prop('darkUI', themes)
            }
          )}
        />
      </span>
    </span>
    <div className="logo">
      <h3 className={classNames({ darkUI: prop('darkUI', themes) })}>
        <span className="logo-bg icon-img-logo" />
        <span className="logo-text">Kakapo</span>
      </h3>
    </div>
  </header>;
