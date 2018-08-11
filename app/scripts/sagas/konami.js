import { eventChannel } from 'redux-saga';
import { fork, call, take, put } from 'redux-saga/effects';
import { append, equals, join, pipe, takeLast } from 'ramda';
import { notifyActions } from 'actions/';
import { noop } from 'utils/';

const konamiChan = () =>
  eventChannel(emit => {
    const code = join(' ', [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]);
    let entered = [];
    document.addEventListener('keydown', ({ keyCode }) => {
      entered = pipe(
        append(keyCode),
        takeLast(10)
      )(entered);
      if (equals(code, join(' ', entered))) emit(true);
    });
    return noop;
  });

function* konami() {
  const chan = yield call(konamiChan);
  while (true) {
    yield take(chan);
    yield put(notifyActions.send('🎉 ️😍 You are awesome! 😍 🎉'));
  }
}

export default function* rootSaga() {
  yield fork(konami);
}
