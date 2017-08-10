import React from 'react';
import { lifecycle } from 'recompose';
import { compose, prop, map, length } from 'ramda';
import { searchActions } from 'actions/';
import { cx } from 'utils/';
import KakapoItem from './kakapoItem';

const KakapoImport = ({ sounds, search, intl, dispatch }) =>
  <div className="kakapo">
    <h5>
      {intl.formatMessage({ id: 'import.kakapo.header' })}
    </h5>
    <div
      className={cx({
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
  </div>;

export default compose(
  lifecycle({
    componentDidMount() {
      this.props.dispatch(searchActions.searchKakapo());
    }
  })
)(KakapoImport);
