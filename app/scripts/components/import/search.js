import React from 'react';
import { Subject } from 'rxjs/Subject';
import { compose, map, prop, addIndex } from 'ramda';
import { searchActions } from 'actions/';
import TextInput from '../ui/textInput/textInput';
import SearchResult from './searchResult';

const mapIndexed = addIndex(map);

function observeAutocomplete(dispatch, service) {
  const subject = new Subject()
    .filter(text => text.length >= 2)
    .debounceTime(750)
    .distinctUntilChanged();

  subject.subscribe({
    next: _s => {
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
      <TextInput
        placeholder={`import.${service}.search_placeholder`}
        name="searchInput"
        spinner={prop('loading', search)}
        intl={intl}
        onChange={({ target }) => subject.next(target.value)}
      />
      <div className={`${service}-items`}>
        {compose(
          mapIndexed((_y, i) =>
            <SearchResult
              key={_y.videoId || _y.scId}
              {...{
                i,
                sound: _y,
                service,
                intl,
                dispatch
              }}
            />
          ),
          prop(service)
        )(search)}
      </div>
    </div>
  );
};
