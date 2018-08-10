import { lensProp, omit, set } from 'ramda';
import { notifyActions } from 'actions/';
import { createReducer } from 'utils/';

export const initialState = {};

export default createReducer(initialState, {
  [notifyActions.NOTIFICATIONS_NOTIFY]: (state, { payload: { id, msg } }) =>
    set(lensProp(id), msg, state),
  [notifyActions.NOTIFICATIONS_CLEAR]: (state, { payload: { id } }) =>
    omit([id], state),
});
