import React from 'react';
import { compose, propEq, reject, values } from 'ramda';
import { DownloadItem } from 'components/';
import './downloadList.css';

export default ({ sounds }) => {
  const downloads = compose(reject(propEq('progress', 1)), values)(sounds);
  if (!downloads.length) return <div />;
  return (
    <div className="download-list">
      {downloads.map(_s => <DownloadItem key={_s.file} sound={{ ..._s }} />)}
    </div>
  );
};
