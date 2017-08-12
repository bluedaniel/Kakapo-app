import { put, call, takeLatest, take, throttle } from 'redux-saga/effects';
import { cond, equals, always, T } from 'ramda';
import { soundActions, soundTypes, notifyActions } from 'actions/';
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

export default function* rootSaga() {
  yield call(soundsRequest);
  yield takeLatest(soundTypes.ADD_LOCAL, addLocal);
  yield takeLatest(soundTypes.ADD_SOUND, addSound);
  yield throttle(500, soundTypes.THROTTLE_VOLUME, setVolume);
}
