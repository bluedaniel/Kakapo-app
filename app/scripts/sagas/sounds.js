import {
  put,
  call,
  takeLatest,
  select,
  takeEvery,
  take,
  throttle
} from 'redux-saga/effects';
import { values, compose, cond, equals, always, T, prop } from 'ramda';
import { soundActions, soundTypes, notifyActions } from 'actions/';
import { bridgedSounds } from 'kakapoBridge';
import {
  getDefaultSounds,
  getCustomFile,
  getYoutubeURL,
  getCustomURL,
  getSoundCloudURL
} from 'api/';

function* soundsRequest() {
  try {
    const resp = yield getDefaultSounds();
    yield put(soundActions.requestSuccess(resp));
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

function* addSound({ service, data }) {
  const channelFn = cond([
    [equals('soundcloud'), always(getSoundCloudURL)],
    [equals('youtube'), always(getYoutubeURL)],
    [T, always(getCustomURL)]
  ])(service);

  const chan = yield call(channelFn, data);
  try {
    while (true) {
      const resp = yield take(chan);
      if (resp.progress === 1) {
        yield put(soundActions.addSoundComplete(resp));
      } else {
        yield put(soundActions.addSoundDownloading(resp));
      }
    }
  } catch (err) {
    yield put(notifyActions.send(err.message));
  }
}

function* setVolume({ sound, volume }) {
  yield put(soundActions.volume(sound, volume));
}

function* saveToStorage() {
  const sounds = yield select(prop('sounds'));
  compose(bridgedSounds.saveToStorage, JSON.stringify, values)(sounds);
}

export default function* rootSaga() {
  yield call(soundsRequest);
  yield takeLatest(soundTypes.ADD_LOCAL, addLocal);
  yield takeLatest(soundTypes.ADD_SOUND, addSound);
  yield throttle(500, soundTypes.THROTTLE_VOLUME, setVolume);
  yield takeEvery('*', saveToStorage);
}
