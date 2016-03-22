import { expect } from 'chai';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { searchActions } from 'actions/';
import { stubFetchWith, kakapoRes, youtubeRes } from '../../helper';
import search, { initialState } from 'reducers/search';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

describe('Reducer `search`', () => {
  beforeEach(() => {
    const stubbedFetch = sinon.stub(window, 'fetch');
    stubMatch(stubbedFetch, /search/, youtubeRes.videos);
    stubMatch(stubbedFetch, /videos/, youtubeRes.statistics);
    stubMatch(stubbedFetch, /kakapo/, kakapoRes);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('search YouTube for `oceans`', (done) => {
    const action = store.dispatch(searchActions.searchYoutube('oceans'));
    action.then(data => {
      expect(data.type).to.eql('SEARCH_YOUTUBE');
      expect(data.items.length).to.eql(2);
      done();

      it('update the store with the new data', () => {
        const reducer = search(initialState, data);
        expect(reducer.get('youtube').count()).to.eql(15);
      });
    });
  });

  it('search Kakapo', (done) => {
    const action = store.dispatch(searchActions.searchKakapo());
    action.then(data => {
      expect(data.type).to.eql('SEARCH_KAKAPO');
      expect(data.items.length).to.eql(14);
      done();

      it('update the store with the new data', () => {
        const reducer = search(initialState, data);
        expect(reducer.get('kakapofavs').count()).to.eql(15);
      });
    });
  });
});
