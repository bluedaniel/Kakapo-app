import React from 'react';
import { compose, prop, map, length } from 'ramda';
import { searchActions } from 'actions/';
import { classNames } from 'utils/';
import KakapoItem from './kakapoItem';

export default ({ sounds, search, intl, dispatch }) => {
  if (!compose(length, prop('kakapofavs'))(search)) {
    dispatch(searchActions.searchKakapo());
  }

  return (
    <div className="kakapo">
      <h5>
        {intl.formatMessage({ id: 'import.kakapo.header' })}
      </h5>
      <div
        className={classNames({
          'kakapofavs-items': compose(length, prop('kakapofavs'))(search)
        })}
      >
        {compose(
          map(_y =>
            <KakapoItem
              key={_y.name}
              sound={_y}
              {...{ ...{ sounds, intl, dispatch } }}
            />
          ),
          prop('kakapofavs')
        )(search)}
      </div>
    </div>
  );
};
