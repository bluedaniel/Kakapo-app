import { lensProp, merge, set } from 'ramda';
import { searchActions } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {
  youtube: [],
  soundcloud: [],
  kakapofavs: [],
  loading: false,
};

const updateList = (state, { payload: { service, items } }) =>
  merge(state, { loading: false, [service]: items });

export default createReducer(initialState, {
  [searchActions.SEARCH_REQUEST]: set(lensProp('loading'), true),
  [searchActions.SEARCH_REQUEST_SUCCESS]: updateList,
});
