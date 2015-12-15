import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { searchActions } from '../../actions';
import KakapoListItem from './kakapoListItem';

class Kakapo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.searchActions.searchKakapo();
  }

  render() {
    return (
      <div className="modal-inner">
        <h5><FormattedMessage id="import.kakapo.header"/></h5>
        <p><FormattedMessage id="import.kakapo.subheader"/></p>
          <div className={classNames({ 'kakapofavs-items': this.props.search.kakapofavs.length })}>
            {this.props.search.kakapofavs.map(_y => <KakapoListItem key={_y.name} sound={_y}/>, this)}
          </div>
      </div>
    );
  }
}

Kakapo.propTypes = {
  searchActions: PropTypes.object,
  search: PropTypes.object
};

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Kakapo));
