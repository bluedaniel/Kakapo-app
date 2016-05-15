import test from 'tape';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { soundActions } from 'actions/';
import { stubFetchWith, kakapoRes } from '../../helper';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

const currState = () => store.getState().sounds;

let defaultState;

test('setup', t => {
  localStorage.removeItem('sounds');
  const stubbedFetch = sinon.stub(window, 'fetch');
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


test('toggle play `on`', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_PLAY');
  t.equal(currState().get('wind').playing, true);
});

test('toggle play `off`', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_PLAY');
  t.equal(currState().get('wind').playing, false);
});

test('change volume', t => {
  t.plan(3);
  t.equal(currState().get('wind').volume, 0.5);
  const action = store.dispatch(soundActions.soundsVolume(currState().get('wind'), 0.25));
  t.equal(action.type, 'SOUNDS_VOLUME');
  t.equal(currState().get('wind').volume, 0.25);
});

test('edit sound', t => {
  t.plan(2);
  const newData = { tags: 'newTag' };
  const action = store.dispatch(soundActions.soundsEdit(currState().get('wind'), newData));
  t.equal(action.type, 'SOUNDS_EDIT');
  t.equal(currState().get('wind').tags, newData.tags);
});

test('remove sound', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.soundsRemove(currState().get('wind')));
  t.equal(action.type, 'SOUNDS_REMOVE');
  t.equal(currState().get('wind'), undefined);
});

test('reset sounds', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.resetSounds(true));
  t.equal(action.type, 'SOUNDS_RESET');
  t.deepEqual(currState().toJS(), {});
});

test('clear sounds', t => {
  t.plan(2);
  const action = store.dispatch(soundActions.resetSounds());
  t.equal(action.type, 'SOUNDS_RESET');
  t.deepEqual(currState().toJS(), defaultState.toJS());
});

test('teardown', t => {
  window.fetch.restore();
  t.end();
});
