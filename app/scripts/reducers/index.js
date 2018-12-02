import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import settings from './settings';
import sounds from './sounds';
import themes from './themes';
import search from './search';
import notifications from './notifications';

export default history =>
  combineReducers({
    router: connectRouter(history),
    sounds,
    settings,
    themes,
    search,
    notifications,
  });
