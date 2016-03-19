import React, { Component, PropTypes } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { intlShape } from 'react-intl';
import { TextInput } from 'components/ui';
import { searchActions } from 'actions/';
import SearchResult from './searchResult';

function observeAutocomplete(input) {
  return Observable.fromEvent(input, 'keyup')
    .map(el => el.target.value)
    .filter(text => text.length > 2)
    .throttleTime(350)
    .distinctUntilChanged();
}

export default class YouTube extends Component {
  static propTypes = {
    searchActions: PropTypes.object,
    search: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  state = {
    service: this.props.location.pathname.split('/')[1],
    loading: false
  };

  componentDidMount() {
    const searchInput = this.refs.searchInput.getElementsByTagName('input')[0];
    const autocomplete = observeAutocomplete(searchInput);
    autocomplete
      .subscribe(() => this.toggleSpinner(true));

    autocomplete
      .switchMap(_s => {
        if (this.state.service === 'youtube') {
          return this.props.dispatch(searchActions.searchYoutube(_s));
        }
        return this.props.dispatch(searchActions.searchSoundCloud(_s));
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
    const { service, loading } = this.state;
    return (
      <div className="youtube">
        <div ref="searchInput">
          <TextInput placeholder={`import.${service}.search_placeholder`}
            name="searchInput" spinner={loading} intl={intl}
          />
        </div>
        <div className={`${service}-items`}>
          {search.get(service).map(_y => {
            const itemProps = {
              service,
              sound: _y,
              ...{ intl, dispatch }
            };
            return <SearchResult key={_y.videoId || _y.scId} {...itemProps} />;
          })}
        </div>
      </div>
    );
  }
}
