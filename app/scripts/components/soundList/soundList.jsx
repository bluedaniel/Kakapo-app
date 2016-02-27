import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { SoundItem, SoundEdit } from 'components/';
import './soundList.css';

export default ({ sounds, themes, intl, dispatch }) => {
  sounds = sounds.toArray().filter(_s => _s.progress === 1);
  if (!sounds.length) return <div />;

  sounds = sounds.map(_s => {
    const soundProps = { themes, sound: { ..._s }, intl, dispatch };

    let item = <SoundItem key={_s.file} { ...soundProps } />;
    if (_s.editing) {
      item = <SoundEdit key={`${_s.file}editing`} { ...soundProps } />;
    }

    return (
      <div className="sound-item-wrap" key={_s.file}>
        <CSSTransitionGroup
          transitionEnterTimeout={450}
          transitionLeaveTimeout={450}
          transitionName="list-animation"
        >
          {item}
        </CSSTransitionGroup>
      </div>
    );
  });

  return (
    <div className="container pure-g">
      <div className="pure-u-1 pure-u-sm-1-2 sound-list">
        {sounds.slice(0, Math.floor(sounds.length / 2))}
      </div>
      <div className="pure-u-1 pure-u-sm-1-2 sound-list">
        {sounds.slice(Math.floor(sounds.length / 2), sounds.length)}
      </div>
    </div>
  );
};
