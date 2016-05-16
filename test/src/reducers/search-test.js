import test from 'tape';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { searchActions } from 'actions/';
import { stubFetchWith, kakapoRes, youtubeRes } from '../../helper';
import search, { initialState } from 'reducers/search';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

function setup() {
  const stubbedFetch = sinon.stub(global, 'fetch');
  stubMatch(stubbedFetch, /search/, youtubeRes.videos);
  stubMatch(stubbedFetch, /videos/, youtubeRes.statistics);
  stubMatch(stubbedFetch, /kakapo/, kakapoRes);
}

function teardown() {
  global.fetch.restore();
}

function testWrap(description, fn) {
  test(description, (t) => {
    setup();
    fn(t);
    teardown();
  });
}

testWrap('[reducer/search] search YouTube for `oceans`', t => {
  const action = store.dispatch(searchActions.searchYoutube('oceans'));
  setTimeout(() => {
    action.then(data => {
      t.equal(data.type, 'SEARCH_YOUTUBE');
      t.equal(data.items.length, 2);

      const reducer = search(initialState, data);
      t.equal(reducer.get('youtube').count(), 15, 'update the store with the new data');
      t.end();
    });
  }, 10000);
});

testWrap('[reducer/search] search Kakapo', t => {
  const action = store.dispatch(searchActions.searchKakapo());
  setTimeout(() => {
    action.then(data => {
      t.equal(data.type, 'SEARCH_KAKAPO');
      t.equal(data.items.length, 14);

      const reducer = search(initialState, data);
      t.equal(reducer.get('kakapofavs').count(), 14, 'update the store with the new data');
      t.end();
    });
  }, 10000);
});
