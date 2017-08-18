import { path, prop } from 'ramda';
import configureStore from 'stores/configureStore';
import { soundActions } from 'actions/';
import { kakapoRes } from '../helper';

const store = configureStore();

const currState = () => prop('sounds', store.getState());
const windSound = () => path(['wind'], currState());

beforeEach(() => {
  localStorage.setItem('version', false);
  localStorage.removeItem('sounds');

  fetch.mockResponses([JSON.stringify(kakapoRes), { status: 200 }]);
});

test('[reducer/sounds] init sounds', () => {
  store.dispatch(soundActions.requestSuccess(kakapoRes));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] toggle play `on`', () => {
  store.dispatch(soundActions.play(windSound()));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] toggle play `off`', () => {
  store.dispatch(soundActions.play(windSound()));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] volume', () => {
  store.dispatch(soundActions.volume(windSound(), 0.25));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] edit', () => {
  const newData = { tags: 'newTag' };
  store.dispatch(soundActions.edit(windSound(), newData));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] remove', () => {
  store.dispatch(soundActions.remove(windSound()));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] reset', () => {
  store.dispatch(soundActions.reset(true));
  expect(currState()).toMatchSnapshot();
});

test('[reducer/sounds] clear', () => {
  store.dispatch(soundActions.reset());
  expect(currState()).toMatchSnapshot();
});
