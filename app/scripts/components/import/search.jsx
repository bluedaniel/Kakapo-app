import React from 'react';
import Rx from 'rxjs';
import { TextInput } from 'components/ui';
import { searchActions } from 'actions/';
import SearchResult from './searchResult';

function observeAutocomplete(dispatch, service) {
  const subject = new Rx.Subject()
  .filter(text => text.length >= 2)
  .debounceTime(750)
  .distinctUntilChanged();

  subject.subscribe({
    next: (_s) => {
      if (service === 'youtube') {
        return dispatch(searchActions.searchYoutube(_s));
      }
      return dispatch(searchActions.searchSoundCloud(_s));
    }
  });

  return subject;
}

export default ({ search, location, intl, dispatch }) => {
  const service = location.pathname.split('/')[1] || 'youtube';
  const subject = observeAutocomplete(dispatch, service);

  return (
    <div className="youtube">
      <TextInput placeholder={`import.${service}.search_placeholder`}
        name="searchInput" spinner={search.get('loading')} intl={intl}
        onChange={({ target }) => subject.next(target.value)} />
      <div className={`${service}-items`}>
        {search.get(service).map(_y => (
          <SearchResult key={_y.videoId || _y.scId} {...{
            sound: _y,
            service,
            intl,
            dispatch
          }} />
        ))}
      </div>
    </div>
  );
};
