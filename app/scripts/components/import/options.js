import React from 'react';
import { cx } from 'utils/';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default () => (
  <div className="downloads">
    <div className="media">
      <h4 className="add-sounds-title">
        <FormattedMessage
          id="import.downloads.header"
          defaultMessage="Add a sound"
        />
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
                <FormattedMessage id={`import.options.${item}`} />
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
              <FormattedMessage id="nav.playlist" />
            </span>
          </Link>
        </li>
        <li className="option" key="settings">
          <Link to="/settings">
            <i className="icon-settings" />
            <span className="text">
              <FormattedMessage id="nav.settings" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
