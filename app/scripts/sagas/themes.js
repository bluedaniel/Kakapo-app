import { select, takeEvery } from 'redux-saga/effects';
import { prop } from 'ramda';
import { bridgedThemes } from 'kakapoBridge';
import { themeActions } from 'actions/';

function* saveToStorage() {
  const sounds = yield select(prop('themes'));
  bridgedThemes.saveToStorage(sounds);
}

export default function* rootSaga() {
  yield takeEvery(themeActions.THEMES_CHANGE, saveToStorage);
}
