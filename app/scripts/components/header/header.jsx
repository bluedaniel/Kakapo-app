import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import './header.css';

export default ({ themes, intl }) => {
  const darkUI = { dark: themes.get('darkUI') };
  return (
    <header className="header" style={themes.getIn([ 'header', 'titlebar' ]).toJS()}>
      <div className="container">
        <Link to="/downloads">
          <i className={classNames('icon-add', 'hint--bottom-right', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.downloads' })} />
        </Link>
        <Link to="/playlist">
          <i className={classNames('icon-playlist', 'hint--bottom-right', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.playlist' })} />
        </Link>
        <Link className="logo" to="/">
          <h3 style={themes.getIn([ 'header', 'h3' ]).toJS()}>
            <img src={require('kakapo-assets/icons/social/kakapo.png')}/>
            Kakapo
          </h3>
        </Link>
        <Link to="/settings">
          <i className={classNames('icon-settings', 'hint--bottom', darkUI)}
            data-hint={intl.formatMessage({ id: 'nav.settings' })} />
        </Link>
      </div>
    </header>
  );
};
