import React, { Component, PropTypes } from 'react';
import Rx from 'rx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import classNames from 'classnames';
import { searchActions } from '../../actions';
import YoutubeListItem from './youtubeListItem';

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      focused: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const autocomplete = this.observeAutocomplete();
    autocomplete
      .subscribe(() => this.toggleSpinner(true));

    autocomplete
      .flatMapLatest(this.props.searchActions.searchYoutube)
      .subscribe(() => this.toggleSpinner(false));
  }

  observeAutocomplete() {
    const input = this.refs.youtubeInput;
    return Rx.Observable.fromEvent(input, 'keyup')
      .map(el => el.target.value)
      .filter(text => text.length > 2)
      .throttle(350)
      .distinctUntilChanged();
  }

  toggleSpinner(active) {
    if (this.state.loading !== active) {
      this.setState({ loading: active });
    }
  }

  onFocus(e) {
    this.setState({ focused: e.target.id });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    return (
      <div>
        <h5><FormattedMessage id="import.youtube.header"/></h5>

        <span className={classNames('input', 'input--manami', {
          'input--filled': this.state.focused === 'input-33'
        })}>
					<input className="input__field input__field--manami" type="text" id="input-33" onBlur={this.onBlur} onFocus={this.onFocus}/>
					<label className="input__label input__label--manami" htmlFor="input-33">
						<span className="input__label-content input__label-content--manami">Website</span>
					</label>
				</span>

        <div className="input-add-on">
          <input
            className="input-add-on-field"
            placeholder={this.props.intl.formatMessage({ id: 'import.youtube.search_placeholder' })}
            ref="youtubeInput"
            type="text"
          />
        <div className={classNames('input-add-on-item', 'spinner', { active: this.state.loading })}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
        <div className={classNames({ 'youtube-items': this.props.search.get('youtube').count() })}>
          {this.props.search.get('youtube').map(_y => <YoutubeListItem key={_y.videoId} sound={_y}/>, this)}
        </div>
      </div>
    );
  }
}

YouTube.propTypes = {
  searchActions: PropTypes.object,
  search: PropTypes.object,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(YouTube));
