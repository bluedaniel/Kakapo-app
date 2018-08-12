import React from 'react';
import { pipe, propEq, reject, values } from 'ramda';
import { DownloadItem } from 'components/';
import './downloadList.css';

export default ({ sounds }) => {
  const downloads = pipe(
    values,
    reject(propEq('progress', 1))
  )(sounds);
  if (!downloads.length) return <div />;
  return (
    <div className="download-list">
      {downloads.map(_s => (
        <DownloadItem key={_s.file} sound={{ ..._s }} />
      ))}
    </div>
  );
};
