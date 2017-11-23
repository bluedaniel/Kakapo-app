import React from 'react';
import { cx } from 'utils/';
import Progress from '../ui/progress/progress';
import './downloadItem.css';

const getImg = (source, img) => {
  const url =
    source === 'file'
      ? `http://data.kakapo.co/v2/images/light_${img}.png`
      : img;
  return url ? (
    <div className="preview" style={{ backgroundImage: `url(${url})` }} />
  ) : (
    <div className="no-image" />
  );
};

export default ({ sound: { source, name, file, progress, img } }) => (
  <div className={cx('download', { active: progress < 1 })}>
    {getImg(source, img)}
    <span className="title">{name}</span>
    <Progress key={`${file}progress`} progress={progress} />
  </div>
);
