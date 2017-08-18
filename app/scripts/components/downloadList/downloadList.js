import React from 'react';
import { values } from 'ramda';
import { DownloadItem } from 'components/';
import './downloadList.css';

export default ({ sounds }) => {
  const downloads = values(sounds).filter(_s => _s.progress < 1);
  if (!downloads.length) return <div />;
  return (
    <div className="download-list">
      {downloads.map(_s => <DownloadItem key={_s.file} sound={{ ..._s }} />)}
    </div>
  );
};
