import { compose, path, length, keys, prop } from 'ramda';
import configureStore from 'stores/configureStore';
import { soundActions } from 'actions/';
import { kakapoRes } from '../helper';

const store = configureStore();

const currState = () => prop('sounds', store.getState());

let defaultState;

beforeEach(() => {
  localStorage.setItem('version', false);
  localStorage.removeItem('sounds');

  fetch.mockResponses([JSON.stringify(kakapoRes), { status: 200 }]);
});

test('[reducer/sounds] init sounds', () => {
  store.dispatch(soundActions.requestSuccess(kakapoRes));

  expect(compose(length, keys)(currState())).toBe(14);
  defaultState = currState();
});

test('[reducer/sounds] toggle play `on`', () => {
  const action = store.dispatch(soundActions.play(path(['wind'], currState())));
  expect(action.type).toBe('SOUNDS_PLAY');
  expect(path(['wind', 'playing'], currState())).toBe(true);
});

test('[reducer/sounds] toggle play `off`', () => {
  const action = store.dispatch(soundActions.play(path(['wind'], currState())));
  expect(action.type).toBe('SOUNDS_PLAY');
  expect(path(['wind', 'playing'], currState())).toBe(false);
});

test('[reducer/sounds] volume', () => {
  expect(path(['wind', 'volume'], currState())).toBe(0.5);
  const action = store.dispatch(
    soundActions.volume(path(['wind'], currState()), 0.25)
  );
  expect(action.type).toBe('SOUNDS_VOLUME');
  expect(path(['wind', 'volume'], currState())).toBe(0.25);
});

test('[reducer/sounds] edit', () => {
  const newData = { tags: 'newTag' };
  const action = store.dispatch(
    soundActions.edit(path(['wind'], currState()), newData)
  );
  expect(action.type).toBe('SOUNDS_EDIT');
  expect(path(['wind', 'tags'], currState())).toBe(newData.tags);
});

test('[reducer/sounds] remove', () => {
  const action = store.dispatch(
    soundActions.remove(path(['wind'], currState()))
  );
  expect(action.type).toBe('SOUNDS_REMOVE');
  expect(path(['wind'], currState())).toBe(undefined);
});

test('[reducer/sounds] reset', () => {
  const action = store.dispatch(soundActions.reset(true));
  expect(action.type).toBe('SOUNDS_RESET');
  expect(currState()).toEqual({});
});

test('[reducer/sounds] clear', () => {
  const action = store.dispatch(soundActions.reset());
  expect(action.type).toBe('SOUNDS_RESET');
  expect(currState()).toEqual(defaultState);
});
