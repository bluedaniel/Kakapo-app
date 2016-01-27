import React, { Component, PropTypes } from 'react';
import Rx from 'rx';
import { intlShape } from 'react-intl';
import { TextInput } from 'components/ui';
import { searchActions } from 'actions/';
import SearchResult from './searchResult';

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
    loading: false
  };

  componentDidMount() {
    const searchInput = this.refs.searchInput.getElementsByTagName('input')[0];
    const autocomplete = observeAutocomplete(searchInput);
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

    searchInput.focus();
  }

  toggleSpinner(active) {
    if (this.state.loading !== active) {
      this.setState({ loading: active });
    }
  }

  render() {
    const { search, intl, dispatch } = this.props;
    return (
      <div className="modal youtube">
        <div className="modal-inner">
          <div ref="searchInput">
            <TextInput placeholder={`import.${this.state.service}.search_placeholder`} name="searchInput" spinner={this.state.loading} intl={intl}/>
          </div>
          <div className={`${this.state.service}-items`}>
            {search.get(this.state.service).map(_y => {
              const itemProps = {
                service: this.state.service,
                sound: _y,
                ...{ intl, dispatch }
              };
              return <SearchResult key={_y.videoId || _y.scId} {...itemProps}/>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
