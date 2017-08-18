import { map } from 'ramda';
import { all, call } from 'redux-saga/effects';
import notifications from './notifications';
import search from './search';
import sounds from './sounds';
import themes from './themes';
import konami from './konami';

export default function*() {
  yield all(map(call, [sounds, notifications, search, themes, konami]));
}
