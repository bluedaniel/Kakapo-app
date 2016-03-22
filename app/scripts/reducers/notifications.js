import constants from 'constants/';
import { createReducer } from 'utils/';

const { NOTIFICATION_SEND, NOTIFICATION_CLEAR } = constants;

const initialState = '';

const notifyReducers = {
  send(state, msg) {
    return msg;
  },
  clear() {
    return '';
  }
};

export default createReducer(initialState, {
  [NOTIFICATION_SEND]: (state, { msg }) => notifyReducers.send(state, msg),
  [NOTIFICATION_CLEAR]: () => notifyReducers.clear()
});
