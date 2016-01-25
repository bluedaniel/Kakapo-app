import React from 'react';
import { Link } from 'react-router';

export default ({ intl }) => (
  <div className="modal downloads">
    <div className="modal-inner media">
      <ul className="option-ul">
        {[ 'kakapo', 'youtube', 'soundcloud' ].map(item => (
          <li className={`option options-${item}`} key={item}>
            <Link to={`/downloads/${item}`}>
              <i className={`icon-${item}`}/>
              <span className="text">{intl.formatMessage({ id: `import.options.${item}` })}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
