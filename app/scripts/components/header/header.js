import React from 'react';
import { prop } from 'ramda';
import { cx } from 'utils/';
import './header.css';

export default ({ settings, themes, onToggleMute }) => (
  <header
    className="header"
    style={{ backgroundColor: prop('primary', themes) }}
  >
    <span
      className="toggle-mute"
      role="button"
      tabIndex={-1}
      onClick={onToggleMute}
    >
      <span
        className="hint--right"
        data-hint={settings.mute ? 'Unmute' : 'Mute'}
      >
        <i
          className={cx(settings.mute ? 'icon-volume_off' : 'icon-volume_up', {
            dark: prop('darkUI', themes),
          })}
        />
      </span>
    </span>
    <div className="logo">
      <h3 className={cx({ darkUI: prop('darkUI', themes) })}>
        <span className="logo-bg icon-img-logo" />
        <span className="logo-text">Kakapo</span>
      </h3>
    </div>
  </header>
);
