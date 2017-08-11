import { all, call } from 'redux-saga/effects';
import sounds from './sounds';

export default function*() {
  yield all([call(sounds)]);
}
