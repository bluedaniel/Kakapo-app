import React from 'react';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { TextInput } from 'components/ui';
import { searchActions } from 'actions/';
import SearchResult from './searchResult';

function observeAutocomplete(event, dispatch, service) {
  return Observable.fromEvent(event, 'data', (a) => a)
    .filter(text => text.length >= 2)
    .debounceTime(750)
    .distinctUntilChanged()
    .switchMap(_s => {
      if (service === 'youtube') {
        return dispatch(searchActions.searchYoutube(_s));
      }
      return dispatch(searchActions.searchSoundCloud(_s));
    })
    .subscribe();
}

export default ({ search, location, intl, dispatch }) => {
  const service = location.pathname.split('/')[1] || 'youtube';
  const eventEmitter = new EventEmitter();

  observeAutocomplete(eventEmitter, dispatch, service);

  const goFetch = ({ target }) => eventEmitter.emit('data', target.value);

  return (
    <div className="youtube">
      <TextInput placeholder={`import.${service}.search_placeholder`}
        name="searchInput" spinner={search.get('loading')} intl={intl}
        onChange={goFetch}
      />
      <div className={`${service}-items`}>
        {search.get(service).map(_y => (
          <SearchResult
            key={_y.videoId || _y.scId}
            {...{
              sound: _y,
              service,
              intl,
              dispatch
            }}
          />
        ))}
      </div>
    </div>
  );
};
