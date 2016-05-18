import test from 'tape';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { soundActions } from 'actions/';
import { stubFetchWith, kakapoRes } from '../../helper';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

const currState = () => store.getState().sounds;

let defaultState;

test('[reducer/sounds] setup', t => {
  localStorage.setItem('version', false);
  localStorage.removeItem('sounds');
  const stubbedFetch = sinon.stub(global, 'fetch');
  stubMatch(stubbedFetch, /kakapo/, kakapoRes);
  t.end();
});

test('[reducer/sounds] init sounds', t => {
  t.plan(3);
  const action = store.dispatch(soundActions.soundsInit());
  action.then(data => {
    t.equal(data.type, 'SOUNDS_RECEIVED');
    t.equal(data.resp.length, 14);
    t.equal(currState().count(), 14);
    defaultState = currState();
  });
});

test('[reducer/sounds] toggle play `on`', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_PLAY');
  t.equal(currState().get('wind').playing, true);
});

test('[reducer/sounds] toggle play `off`', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_PLAY');
  t.equal(currState().get('wind').playing, false);
});

test('[reducer/sounds] volume', t => {
  t.plan(3);
  t.equal(currState().get('wind').volume, 0.5);
  const action = store.dispatch(soundActions.soundsVolume(currState().get('wind'), 0.25));
  t.equal(action.type, 'SOUNDS_VOLUME');
  t.equal(currState().get('wind').volume, 0.25);
});

test('[reducer/sounds] edit', t => {
  t.plan(2);
  const newData = { tags: 'newTag' };
  const action = store.dispatch(soundActions.soundsEdit(currState().get('wind'), newData));
  t.equal(action.type, 'SOUNDS_EDIT');
  t.equal(currState().get('wind').tags, newData.tags);
});

test('[reducer/sounds] remove', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsRemove(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_REMOVE');
  t.equal(currState().get('wind'), undefined);
});

test('[reducer/sounds] reset', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.resetSounds(true));
  t.equal(action.type, 'SOUNDS_RESET');
  t.deepEqual(currState().toJS(), {});
});

test('[reducer/sounds] clear', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.resetSounds());
  t.equal(action.type, 'SOUNDS_RESET');
  t.deepEqual(currState().toJS(), defaultState.toJS());
});

test('[reducer/sounds] teardown', t => {
  global.fetch.restore();
  t.end();
});
