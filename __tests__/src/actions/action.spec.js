import configureStore from 'redux-mock-store';
import {
  searchActions,
  settingActions,
  soundActions,
  themeActions,
  notifyActions,
} from 'actions/';

test('[action/searchActions]', () => {
  const store = configureStore([])({});
  store.dispatch(searchActions.input('test'));
  store.dispatch(searchActions.kakapo());
  store.dispatch(searchActions.youtube('test'));
  store.dispatch(searchActions.soundcloud('test'));
  store.dispatch(searchActions.request());
  store.dispatch(searchActions.requestSuccess('test', 'test'));
  store.dispatch(searchActions.requestError('test'));
  expect(store.getActions()).toMatchSnapshot();
});

test('[action/settingActions]', () => {
  const store = configureStore([])({});
  store.dispatch(settingActions.mute('test'));
  store.dispatch(settingActions.dock('test'));
  store.dispatch(settingActions.devtools('test'));
  store.dispatch(settingActions.language('test'));
  store.dispatch(settingActions.update('test'));
  expect(store.getActions()).toMatchSnapshot();
});

test('[action/soundActions]', () => {
  const store = configureStore([])({});
  store.dispatch(soundActions.request());
  store.dispatch(soundActions.requestSuccess('test'));
  store.dispatch(soundActions.mute());
  store.dispatch(soundActions.play('test'));
  store.dispatch(soundActions.throttleVolume('test', 'test'));
  store.dispatch(soundActions.volume('test', 'test'));
  store.dispatch(soundActions.edit('test', 'test'));
  store.dispatch(soundActions.remove('test'));
  store.dispatch(soundActions.addLocal('test'));
  store.dispatch(soundActions.addSound('test', 'test'));
  store.dispatch(soundActions.addSoundDownloading('test'));
  store.dispatch(soundActions.addSoundComplete('test'));
  store.dispatch(soundActions.reset('test'));
  store.dispatch(soundActions.playlist('test'));
  store.dispatch(soundActions.createPlaylist());
  expect(store.getActions()).toMatchSnapshot();
});

test('[action/themeActions]', () => {
  const store = configureStore([])({});
  store.dispatch(themeActions.change('test', 'test'));
  expect(store.getActions()).toMatchSnapshot();
});

test('[action/notifyActions]', () => {
  const store = configureStore([])({});
  store.dispatch(notifyActions.send('test', 'test'));
  store.dispatch(notifyActions.notify('test', 'test'));
  store.dispatch(notifyActions.clear('test'));
  expect(store.getActions()).toMatchSnapshot();
});
