import React from 'react';
import {
  addIndex,
  splitAt,
  map,
  divide,
  compose,
  filter,
  length,
  values,
  propEq,
} from 'ramda';
import { CSSTransition } from 'react-transition-group';
import { SoundItem, SoundEdit } from 'components/';
import './soundList.css';

const mapIndexed = addIndex(map);

const getDownloadedSounds = compose(filter(propEq('progress', 1)), values);

export default ({ sounds, themes, intl, dispatch }) => {
  const downloadedSounds = getDownloadedSounds(sounds);
  const soundCount = length(downloadedSounds);
  if (!soundCount) return <div />;

  const listSounds = compose(
    splitAt(Math.floor(divide(soundCount, 2))),
    map(_s => {
      const soundProps = { themes, sound: { ..._s }, intl, dispatch };

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
    })
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
