/* eslint-env mocha */
/* eslint no-console:0 */
import { expect } from 'chai';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { soundActions } from 'actions/';
import { stubFetchWith, kakapoRes } from '../../helper';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

const currState = () => store.getState().sounds;

let defaultState;

describe('Reducer `sounds`', () => {
  beforeEach(() => {
    localStorage.removeItem('sounds');
    const stubbedFetch = sinon.stub(window, 'fetch');
    stubMatch(stubbedFetch, /kakapo/, kakapoRes);
  });

  afterEach(() => window.fetch.restore());

  it('init sounds', (done) => {
    const action = store.dispatch(soundActions.soundsInit());
    action.then(data => {
      expect(data.type).to.eql('SOUNDS_RECEIVED');
      expect(data.resp.length).to.eql(14);
      expect(currState().count()).to.eql(14);
      defaultState = currState();
      done();
    });
  });

  describe('then', () => {
    it('toggle play `on`', () => {
      const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
      expect(action.type).to.eql('SOUNDS_PLAY');
      expect(currState().get('wind').playing).to.eql(true);
    });
  });

  describe('then', () => {
    it('toggle play `off`', () => {
      const action = store.dispatch(soundActions.soundsPlay(currState().get('wind')));
      expect(action.type).to.eql('SOUNDS_PLAY');
      expect(currState().get('wind').playing).to.eql(false);
    });

    it('change volume', () => {
      expect(currState().get('wind').volume).to.eql(0.5);
      const action = store.dispatch(soundActions.soundsVolume(currState().get('wind'), 0.25));
      expect(action.type).to.eql('SOUNDS_VOLUME');
      expect(currState().get('wind').volume).to.eql(0.25);
    });

    it('edit sound', () => {
      const newData = { tags: 'newTag' };
      const action = store.dispatch(soundActions.soundsEdit(currState().get('wind'), newData));
      expect(action.type).to.eql('SOUNDS_EDIT');
      expect(currState().get('wind').tags).to.eql(newData.tags);
    });

    it('remove sound', () => {
      const action = store.dispatch(soundActions.soundsRemove(currState().get('wind')));
      expect(action.type).to.eql('SOUNDS_REMOVE');
      expect(currState().get('wind')).to.eql(undefined);
    });

    it('reset sounds', () => {
      const action = store.dispatch(soundActions.resetSounds(true));
      expect(action.type).to.eql('SOUNDS_RESET');
      expect(currState().toJS()).to.eql({});
    });

    it('clear sounds', () => {
      const action = store.dispatch(soundActions.resetSounds());
      expect(action.type).to.eql('SOUNDS_RESET');
      expect(currState().toJS()).to.eql(defaultState.toJS());
    });
  });
});
