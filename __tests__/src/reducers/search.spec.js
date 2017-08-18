import { prop } from 'ramda';
import configureStore from 'stores/configureStore';
import { searchActions } from 'actions/';
import { kakapoRes } from '../helper';

const store = configureStore();

const currState = () => prop('search', store.getState());

test('[reducer/search] request loading', () => {
  store.dispatch(searchActions.request());
  expect(currState()).toMatchSnapshot();
});

test('[reducer/search] request success', () => {
  store.dispatch(searchActions.requestSuccess(kakapoRes, 'kakapofavs'));
  expect(currState()).toMatchSnapshot();
});
