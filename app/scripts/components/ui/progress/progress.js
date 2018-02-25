import React from 'react';
import './progress.css';

export default ({ progress = 0 }) => (
  <div className="progress">
    <div
      className="progress-barberpole"
      style={{ width: `${Math.ceil(progress * 100)}%` }}
    />
    <div className="progress-text">{Math.ceil(progress * 100)}%</div>
  </div>
);
