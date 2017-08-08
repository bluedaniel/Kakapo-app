import { set, lensProp, omit } from 'ramda';
import constants from 'actions/constants/';
import { createReducer } from 'utils/';

const { NOTIFICATION_SEND, NOTIFICATION_CLEAR } = constants;

export const initialState = {};

export default createReducer(initialState, {
  [NOTIFICATION_SEND]: (state, { id, msg }) => set(lensProp(id), msg, state),
  [NOTIFICATION_CLEAR]: (state, { id }) => omit([id], state)
});
