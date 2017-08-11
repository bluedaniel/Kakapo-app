import { all, call } from 'redux-saga/effects';
import sounds from './sounds';
import notifications from './notifications';

export default function*() {
  yield all([call(sounds), call(notifications)]);
}
