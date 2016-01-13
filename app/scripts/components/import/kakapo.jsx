import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { searchActions } from 'actions/';
import KakapoListItem from './kakapoListItem';

class Kakapo extends Component {
  static propTypes = {
    searchActions: PropTypes.object,
    search: PropTypes.object
  };

  componentDidMount() {
    this.props.searchActions.searchKakapo();
  }

  render() {
    return (
      <div className="modal-inner">
        <h5><FormattedMessage id="import.kakapo.header"/></h5>
        <div className={classNames({ 'kakapofavs-items': this.props.search.get('kakapofavs').count() })}>
          {this.props.search.get('kakapofavs').map(_y => <KakapoListItem key={_y.name} sound={_y}/>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Kakapo));
