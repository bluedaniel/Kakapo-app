import React from 'react';
import { classNames } from 'utils/';
import './nav.css';

export default ({ themes, intl }) => {
  const renderDragOrDownload = () => {
    /* istanbul ignore if */
    if (__DESKTOP__) {
      return <span className="drag" />;
    }
    return (
      <a className="download-app" href="http://www.kakapo.co/app.html" target="_blank">
        {intl.formatMessage({ id: 'nav.app' })}
      </a>
    );
  };

  return (
    <div className={classNames('topbar', { dark: themes.get('darkUI') })}
      style={themes.getIn([ 'header', 'download' ]).toJS()}
    >
      {renderDragOrDownload()}
      <div className="share">
        {__WEB__ ? <div className="fb-share-button" data-href="http://www.kakapo.co" data-layout="button_count" /> : null}
        <a href="https://twitter.com/share" className="twitter-share-button" data-url="http://www.kakapo.co">Tweet</a>
      </div>
    </div>
  );
};
