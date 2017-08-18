import {
  searchActions,
  settingActions,
  soundActions,
  themeActions,
  notifyActions
} from 'actions/';

test('[action/searchActions]', () => {
  expect(searchActions.input('test')).toMatchSnapshot();
  expect(searchActions.kakapo()).toMatchSnapshot();
  expect(searchActions.youtube('test')).toMatchSnapshot();
  expect(searchActions.soundcloud('test')).toMatchSnapshot();
  expect(searchActions.request()).toMatchSnapshot();
  expect(searchActions.requestSuccess('test', 'test')).toMatchSnapshot();
  expect(searchActions.requestError('test')).toMatchSnapshot();
});
