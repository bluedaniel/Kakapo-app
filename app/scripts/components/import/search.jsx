import React, { Component, PropTypes } from 'react';
import Rx from 'rx';
import { intlShape } from 'react-intl';
import classNames from 'classnames';
import { searchActions } from 'actions/';
import YoutubeItem from './youtubeItem';
import SoundCloudItem from './soundcloudItem';

function observeAutocomplete(input) {
  return Rx.Observable.fromEvent(input, 'keyup')
    .map(el => el.target.value)
    .filter(text => text.length > 2)
    .throttle(350)
    .distinctUntilChanged();
}

export default class YouTube extends Component {
  static propTypes = {
    searchActions: PropTypes.object,
    search: PropTypes.object,
    intl: intlShape
  };

  state = {
    service: this.props.location.pathname.split('/')[2],
    loading: false,
    focused: false,
    input: false
  };

  componentDidMount() {
    const autocomplete = observeAutocomplete(this.refs.searchInput);
    autocomplete
      .subscribe(() => this.toggleSpinner(true));

    autocomplete
      .flatMapLatest(_s => {
        if (this.state.service === 'youtube') {
          return this.props.dispatch(searchActions.searchYoutube(_s));
        }
        if (this.state.service === 'soundcloud') {
          return this.props.dispatch(searchActions.searchSoundCloud(_s));
        }
      })
      .subscribe(() => this.toggleSpinner(false));

    this.refs.searchInput.focus();
  }

  toggleSpinner(active) {
    if (this.state.loading !== active) {
      this.setState({ loading: active });
    }
  }

  onFocus = (e) => this.setState({ focused: e.target.id });

  onBlur = () => this.setState({
    focused: false,
    input: this.refs.searchInput.value.length
  });

  render() {
    const { search, intl } = this.props;
    return (
      <div className="modal youtube">
        <div className="modal-inner">
          <span className={classNames('input', {
            'input--filled': this.state.focused === 'input' || this.state.input
          })}>
            <input className="input__field" id="input" onBlur={this.onBlur} onFocus={this.onFocus} ref="searchInput" type="text"/>
            <label className="input__label" htmlFor="input">
              <span className="input__label-content">
                {intl.formatMessage({ id: `import.${this.state.service}.search_placeholder` })}
              </span>
            </label>
            <div className={classNames('input-add-on-item', 'spinner', { active: this.state.loading })}>
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </span>

          <div className={`${this.state.service}-items`}>
            {search.get(this.state.service).map(_y => {
              if (this.state.service === 'youtube') {
                return <YoutubeItem key={_y.videoId} sound={_y}/>;
              }
              if (this.state.service === 'soundcloud') {
                return <SoundCloudItem key={_y.scId} sound={_y}/>;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
