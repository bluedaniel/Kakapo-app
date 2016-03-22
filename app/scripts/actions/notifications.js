import constants from 'constants/';

const { NOTIFICATION_SEND, NOTIFICATION_CLEAR } = constants;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const actions = {
  send: (msg, time = 3000) => dispatch => {
    dispatch(actions.notify(msg));
    return delay(time).then(() => dispatch(actions.clear()));
  },
  notify: msg => ({ type: NOTIFICATION_SEND, msg }),
  clear: () => ({ type: NOTIFICATION_CLEAR })
};

export default actions;
