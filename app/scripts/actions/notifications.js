import shortid from 'shortid';
import constants from 'actions/constants/';

const { NOTIFICATION_SEND, NOTIFICATION_CLEAR } = constants;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const actions = {
  send: (msg, time = 3000) => dispatch => {
    const id = shortid.generate();
    dispatch(actions.notify(id, msg));
    return delay(time).then(() => dispatch(actions.clear(id)));
  },
  notify: (id, msg) => ({ type: NOTIFICATION_SEND, id, msg }),
  clear: id => ({ type: NOTIFICATION_CLEAR, id })
};

export default actions;
