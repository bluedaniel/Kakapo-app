import { lensProp, omit, set } from 'ramda';
import { notifyTypes } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {};

export default createReducer(initialState, {
  [notifyTypes.NOTIFY]: (state, { id, msg }) => set(lensProp(id), msg, state),
  [notifyTypes.CLEAR]: (state, { id }) => omit([id], state),
});
