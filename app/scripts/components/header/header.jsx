import React from 'react';
import { classNames, camelCase } from 'utils/';
import './header.css';

export default ({ themes }) => (
  <header
    className={classNames('header', { hideHint: camelCase(location.pathname).length })}
    style={themes.getIn([ 'header', 'titlebar' ]).toJS()}
  >
    <div className="logo" to="/">
      <h3 style={themes.getIn([ 'header', 'h3' ]).toJS()}>
        <span className="logo-bg icon-logo"></span>
        <span className="logo-text">Kakapo</span>
      </h3>
    </div>
  </header>
);
