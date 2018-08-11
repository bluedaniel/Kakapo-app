import React from 'react';
import {
  addIndex,
  divide,
  filter,
  length,
  map,
  pipe,
  propEq,
  splitAt,
  values,
} from 'ramda';
import { CSSTransition } from 'react-transition-group';
import { SoundItem, SoundEdit } from 'components/';
import './soundList.css';

const mapIndexed = addIndex(map);

const getDownloadedSounds = pipe(
  values,
  filter(propEq('progress', 1))
);

export default ({ sounds, themes, dispatch }) => {
  const downloadedSounds = getDownloadedSounds(sounds);
  const soundCount = length(downloadedSounds);
  if (!soundCount) return <div />;

  const listSounds = pipe(
    map(_s => {
      const soundProps = { themes, sound: { ..._s }, dispatch };

      return (
        <div className="sound-item-wrap" key={_s.file}>
          <CSSTransition timeout={450} classNames="list-animation">
            {_s.editing ? (
              <SoundEdit key={`${_s.file}editing`} {...soundProps} />
            ) : (
              <SoundItem key={_s.file} {...soundProps} />
            )}
          </CSSTransition>
        </div>
      );
    }),
    splitAt(Math.floor(divide(soundCount, 2)))
  )(downloadedSounds);

  return (
    <section>
      {mapIndexed(
        (x, i) => (
          <div key={i} className="sound-list">
            {x}
          </div>
        ),
        listSounds
      )}
    </section>
  );
};
