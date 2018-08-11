import React from 'react';
import { connect } from 'react-redux';
import { addIndex, map, pick, pipe, prop } from 'ramda';
import { searchActions } from 'actions/';
import TextInput from '../ui/textInput/textInput';
import SearchResult from './searchResult';

const mapIndexed = addIndex(map);

export const Search = ({ search, router: { location }, dispatch }) => {
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
        onChange={onChange}
      />
      <div className={`${service}-items`}>
        {pipe(
          prop(service),
          mapIndexed((_y, i) => (
            <SearchResult
              key={_y.videoId || _y.scId}
              {...{
                i,
                sound: _y,
                service,
                dispatch,
              }}
            />
          ))
        )(search)}
      </div>
    </div>
  );
};

const mapStateToProps = pick(['search', 'router']);

export default connect(mapStateToProps)(Search);
