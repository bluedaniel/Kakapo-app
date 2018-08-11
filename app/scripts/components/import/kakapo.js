import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { length, map, pick, pipe, prop } from 'ramda';
import { searchActions } from 'actions/';
import { cx } from 'utils/';
import KakapoItem from './kakapoItem';

export const ImportKakapo = ({ sounds, search, dispatch }) => (
  <div className="kakapo">
    <h5>
      <FormattedMessage id="import.kakapo.header" />
    </h5>
    <div
      className={cx({
        'kakapofavs-items': pipe(
          prop('kakapofavs'),
          length
        )(search),
      })}
    >
      {pipe(
        prop('kakapofavs'),
        map(_y => (
          <KakapoItem
            key={_y.file}
            sound={_y}
            {...{ ...{ sounds, dispatch } }}
          />
        ))
      )(search)}
    </div>
  </div>
);

const mapStateToProps = pick(['sounds', 'search']);

export default pipe(
  lifecycle({
    componentDidMount() {
      this.props.dispatch(searchActions.kakapo());
    },
  }),
  connect(mapStateToProps)
)(ImportKakapo);
