import { all, call } from 'redux-saga/effects';
import notifications from './notifications';
import search from './search';
import sounds from './sounds';

export default function*() {
  yield all([call(sounds), call(notifications), call(search)]);
}
