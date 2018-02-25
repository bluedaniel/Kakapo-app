import React from 'react';
import { cx } from 'utils/';
import { Link } from 'react-router-dom';

export default ({ intl }) => (
  <div className="downloads">
    <div className="media">
      <h4 className="add-sounds-title">
        {intl.formatMessage({
          id: 'import.downloads.header',
          defaultMessage: 'Add a sound',
        })}
      </h4>
      <ul className="option-ul">
        {['kakapo', 'youtube', 'soundcloud', 'custom'].map(item => (
          <li className={`option options-${item}`} key={item}>
            <Link to={`/${item}`}>
              <i
                className={cx(`icon-img-${item}`, {
                  'icon-add': item === 'custom',
                })}
              />
              <span className="text">
                {intl.formatMessage({ id: `import.options.${item}` })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="divider" />
      <ul className="option-ul">
        <li className="option" key="playlist">
          <Link to="/playlist">
            <i className="icon-playlist" />
            <span className="text">
              {intl.formatMessage({ id: 'nav.playlist' })}
            </span>
          </Link>
        </li>
        <li className="option" key="settings">
          <Link to="/settings">
            <i className="icon-settings" />
            <span className="text">
              {intl.formatMessage({ id: 'nav.settings' })}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
