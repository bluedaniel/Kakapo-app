import { lensProp, merge, set } from 'ramda';
import { searchTypes } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {
  youtube: [],
  soundcloud: [],
  kakapofavs: [],
  loading: false,
};

const updateList = (state, { service, items }) =>
  merge(state, { loading: false, [service]: items });

export default createReducer(initialState, {
  [searchTypes.REQUEST]: set(lensProp('loading'), true),
  [searchTypes.REQUEST_SUCCESS]: updateList,
});
