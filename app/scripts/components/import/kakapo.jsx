import React from 'react';
import classNames from 'classnames';
import { searchActions } from 'actions/';
import KakapoItem from './kakapoItem';

export default ({ search, intl, dispatch }) => {
  if (!search.get('kakapofavs').count()) {
    dispatch(searchActions.searchKakapo());
  }

  return (
    <div className="modal kakapo">
      <div className="modal-inner">
        <h5>{intl.formatMessage({ id: 'import.kakapo.header' })}</h5>
        <div className={classNames({ 'kakapofavs-items': search.get('kakapofavs').count() })}>
          {search.get('kakapofavs').map(_y => <KakapoItem key={_y.name} sound={_y}/>)}
        </div>
      </div>
    </div>
  );
};
