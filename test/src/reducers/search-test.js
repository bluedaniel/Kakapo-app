import test from 'tape';
import sinon from 'sinon';
import { store } from 'stores/configureStore';
import { searchActions } from 'actions/';
import { stubFetchWith, kakapoRes, youtubeRes } from '../../helper';
import search, { initialState } from 'reducers/search';

const stubMatch = (stub, regex, data) =>
  stub.withArgs(sinon.match(regex)).returns(Promise.resolve(stubFetchWith(data)));

test('setup', t => {
  const stubbedFetch = sinon.stub(window, 'fetch');
  stubMatch(stubbedFetch, /search/, youtubeRes.videos);
  stubMatch(stubbedFetch, /videos/, youtubeRes.statistics);
  stubMatch(stubbedFetch, /kakapo/, kakapoRes);
  t.end();
});

test('[reducer/search] search YouTube for `oceans`', t => {
  t.plan(2);
  const action = store.dispatch(searchActions.searchYoutube('oceans'));
  action.then(data => {
    t.equal(data.type, 'SEARCH_YOUTUBE');
    t.equal(data.items.length, 2);

    test('update the store with the new data', t => {
      t.plan(1);
      const reducer = search(initialState, data);
      t.equal(reducer.get('youtube').count(), 15);
    });
  });
});

test('[reducer/search] search Kakapo', t => {
  t.plan(2);
  const action = store.dispatch(searchActions.searchKakapo());
  action.then(data => {
    t.equal(data.type, 'SEARCH_KAKAPO');
    t.equal(data.items.length, 14);

    test('update the store with the new data', t => {
      t.plan(1);
      const reducer = search(initialState, data);
      t.equal(reducer.get('kakapofavs').count(), 14);
    });
  });
});

test('teardown', t => {
  window.fetch.restore();
  t.end();
});
