import React from 'react';
import { Link } from 'react-router';
import { camelCase } from 'lodash';
import { classNames } from 'utils/';
import './header.css';

export default ({ themes, intl, location }) => {
  const darkUI = { dark: themes.get('darkUI') };
  return (
    <header
      className={classNames('header', { hideHint: camelCase(location.pathname).length })}
      style={themes.getIn([ 'header', 'titlebar' ]).toJS()}
    >
      <div className="container">
        <Link to="/downloads">
          <i className={classNames('icon-add', 'hint--bottom-right', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.downloads' })}
          />
        </Link>
        <Link to="/playlist">
          <i className={classNames('icon-playlist', 'hint--bottom-right', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.playlist' })}
          />
        </Link>
        <Link className="logo" to="/">
          <h3 style={themes.getIn([ 'header', 'h3' ]).toJS()}>
            <span className="logo-bg icon-logo"></span>
            <span className="logo-text">Kakapo</span>
          </h3>
        </Link>
        <Link to="/settings">
          <i className={classNames('icon-settings', 'hint--bottom-left', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.settings' })}
          />
        </Link>
      </div>
    </header>
  );
};
