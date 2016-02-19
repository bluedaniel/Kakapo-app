import React from 'react';
import { Progress } from 'components/ui/';
import { classNames } from 'utils/';
import './downloadItem.css';

export default ({ sound }) => {
  let img = sound.img;
  if (sound.source === 'file') img = `http://data.kakapo.co/v2/images/light_${img}.png`;
  return (
    <div className={classNames('download', { active: sound.progress < 1 })}>
      {img ? <div className="preview" style={{ backgroundImage: `url(${img})` }}/> : <div className="no-image"/>}
      <span className="title">{sound.name}</span>
      <Progress key={sound.file + 'progress'} progress={sound.progress}/>
    </div>
  );
};
