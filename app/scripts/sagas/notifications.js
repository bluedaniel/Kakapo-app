import shortid from 'shortid';
import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { notifyActions } from 'actions/';

function* send({ msg, time = 3000 }) {
  const id = shortid.generate();
  yield put(notifyActions.notify(id, msg));
  yield delay(time);
  yield put(notifyActions.clear(id));
}

export default function* rootSaga() {
  yield takeEvery(notifyActions.NOTIFICATIONS_SEND, send);
}
