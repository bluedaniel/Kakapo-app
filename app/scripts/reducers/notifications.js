import { Map } from 'immutable';
import constants from 'actions/constants/';
import { createReducer } from 'utils/';

const { NOTIFICATION_SEND, NOTIFICATION_CLEAR } = constants;

export const initialState = new Map();

const notifyReducers = {
  send(state, id, msg) {
    return state.set(id, msg);
  },
  clear(state, id) {
    return state.delete(id);
  }
};

export default createReducer(initialState, {
  [NOTIFICATION_SEND]: (state, { id, msg }) =>
    notifyReducers.send(state, id, msg),
  [NOTIFICATION_CLEAR]: (state, { id }) => notifyReducers.clear(state, id)
});
