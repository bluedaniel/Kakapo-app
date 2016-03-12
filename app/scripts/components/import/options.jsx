import React from 'react';
import { Link } from 'react-router';

export default ({ intl }) => (
  <div className="downloads">
    <div className="media">
      <h4>{intl.formatMessage({ id: 'import.downloads.header' })}</h4>
      <ul className="option-ul">
        {[ 'kakapo', 'youtube', 'soundcloud', 'custom' ].map(item => (
          <li className={`option options-${item}`} key={item}>
            <Link to={`/${item}`}>
              <i className={`icon-${item} dark`} />
              <span className="text">{intl.formatMessage({ id: `import.options.${item}` })}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/playlist">
        <i className="icon-playlist hint--bottom-right"
          data-hint={intl.formatMessage({ id: 'nav.playlist' })}
        />
      </Link>
      <Link to="/settings">
        <i className="icon-setting hint--bottom-left"
          data-hint={intl.formatMessage({ id: 'nav.settings' })}
        />
      </Link>
    </div>
  </div>
);
