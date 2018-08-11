import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { compose, length, map, pick, prop } from 'ramda';
import { searchActions } from 'actions/';
import { cx } from 'utils/';
import KakapoItem from './kakapoItem';

const KakapoImport = ({ sounds, search, dispatch }) => (
  <div className="kakapo">
    <h5>
      <FormattedMessage id="import.kakapo.header" />
    </h5>
    <div
      className={cx({
        'kakapofavs-items': compose(
          length,
          prop('kakapofavs')
        )(search),
      })}
    >
      {compose(
        map(_y => (
          <KakapoItem
            key={_y.file}
            sound={_y}
            {...{ ...{ sounds, dispatch } }}
          />
        )),
        prop('kakapofavs')
      )(search)}
    </div>
  </div>
);

const mapStateToProps = pick(['sounds', 'search']);

export default compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(searchActions.kakapo());
    },
  })
)(KakapoImport);
