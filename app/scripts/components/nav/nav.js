import React from 'react';
import { FormattedMessage } from 'react-intl';
import { prop } from 'ramda';
import { cx } from 'utils/';
import './nav.css';

export default ({ themes }) => {
  const renderDragOrDownload = () => {
    /* istanbul ignore if */
    if (__DESKTOP__) {
      return <span className="drag" />;
    }
    return (
      <a
        className="download-app"
        href="http://www.kakapo.co/app.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="nav.app" />
      </a>
    );
  };

  return (
    <div
      className={cx('topbar', { darkUI: prop('darkUI', themes) })}
      style={{ backgroundColor: prop('darkPrimary', themes) }}
    >
      {renderDragOrDownload()}
      <div className="share">
        {__WEB__ ? (
          <div
            className="fb-share-button"
            data-href="http://www.kakapo.co"
            data-layout="button_count"
          />
        ) : null}
        <a
          href="https://twitter.com/share"
          className="twitter-share-button"
          data-url="http://www.kakapo.co"
        >
          Tweet
        </a>
      </div>
    </div>
  );
};
