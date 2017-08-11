import { put, call, takeLatest } from 'redux-saga/effects';
import constants from 'actions/constants/';
import { soundActions, notifyActions } from 'actions/';
import { getDefaultSounds, getCustomFile } from 'api/';

function* soundsRequest() {
  try {
    const resp = yield getDefaultSounds();
    yield put(soundActions.soundsRequestSuccess(resp));
  } catch (err) {
    yield put(notifyActions.send(err));
  }
}

function* addLocal({ file }) {
  if (!__DESKTOP__) {
    return yield put(
      notifyActions.send(
        'You can only add desktop files with the Kakapo desktop app.'
      )
    );
  }

  return yield put(
    soundActions.addSoundComplete(getCustomFile(file.name, file.path))
  );
}

export default function* rootSaga() {
  yield call(soundsRequest);
  yield takeLatest(constants.SOUNDS_ADD_LOCAL, addLocal);
}
