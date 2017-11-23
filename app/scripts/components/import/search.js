import React from 'react';
import { compose, map, prop, addIndex } from 'ramda';
import { searchActions } from 'actions/';
import TextInput from '../ui/textInput/textInput';
import SearchResult from './searchResult';

const mapIndexed = addIndex(map);

export default ({ search, location, intl, dispatch }) => {
  const service = location.pathname.split('/')[1] || 'youtube';
  const onChange = ({ target: { value } }) =>
    service === 'youtube'
      ? dispatch(searchActions.youtube(value))
      : dispatch(searchActions.soundcloud(value));

  return (
    <div className="youtube">
      <TextInput
        placeholder={`import.${service}.search_placeholder`}
        name="searchInput"
        spinner={prop('loading', search)}
        intl={intl}
        onChange={onChange}
      />
      <div className={`${service}-items`}>
        {compose(
          mapIndexed((_y, i) => (
            <SearchResult
              key={_y.videoId || _y.scId}
              {...{
                i,
                sound: _y,
                service,
                intl,
                dispatch,
              }}
            />
          )),
          prop(service)
        )(search)}
      </div>
    </div>
  );
};
