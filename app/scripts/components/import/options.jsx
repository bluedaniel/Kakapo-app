import React from 'react';
import { Link } from 'react-router';

export default ({ intl }) => {
  return (
    <div className="modal-inner media">
      <ul className="option-ul">
        <li className="option options-kakapo">
          <Link to="/downloads/kakapo">
            <i className="icon-kakapo"/>
            <span className="text">{intl.formatMessage({ id: 'import.options.kakapo' })}</span>
          </Link>
        </li>
        <li className="option options-youtube">
          <Link to="/downloads/youtube">
            <i className="icon-youtube"/>
            <span className="text">{intl.formatMessage({ id: 'import.options.youtube' })}</span>
          </Link>
        </li>
        <li className="option options-soundcloud">
          <Link to="/downloads/soundcloud">
            <i className="icon-soundcloud"/>
            <span className="text">{intl.formatMessage({ id: 'import.options.soundcloud' })}</span>
          </Link>
        </li>
        <li className="option options-custom" >
          <Link to="/downloads/custom">
            <i className="icon-file dark"/>
            <span className="text">{intl.formatMessage({ id: 'import.options.custom' })}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
