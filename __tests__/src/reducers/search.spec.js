import { prop, compose, length } from 'ramda';
import { store } from 'stores/configureStore';
import { searchActions } from 'actions/';
import search, { initialState } from 'reducers/search';
import { stubFetchWith, kakapoRes, youtubeRes, mockResponse } from '../helper';

// const stubMatch = (stub, regex, data) =>
//   stub
//     .withArgs(sinon.match(regex))
//     .returns(Promise.resolve(stubFetchWith(data)));
//
// test('[reducer/search] setup', () => {
//   const stubbedFetch = sinon.stub(global, 'fetch');
//   stubMatch(stubbedFetch, /search/, youtubeRes.videos);
//   stubMatch(stubbedFetch, /videos/, youtubeRes.statistics);
//   stubMatch(stubbedFetch, /kakapo/, kakapoRes);
// });

test('[reducer/search] search YouTube for `oceans`', () => {
  expect.assertions(3);

  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, youtubeRes.videos))
    );

  const action = store.dispatch(searchActions.searchYoutube('oceans'));
  return action.then(data => {
    expect(data.type).toBe('SEARCH_YOUTUBE');
    expect(data.items.length).toBe(15);

    const reducer = search(initialState, data);
    expect(compose(length, prop('youtube'))(reducer)).toBe(15);
  });
});

// test('[reducer/search] search Kakapo', t => {
//   t.plan(3);
//   const action = store.dispatch(searchActions.searchKakapo());
//   action.then(data => {
//     t.equal(data.type, 'SEARCH_KAKAPO');
//     t.equal(data.items.length, 14);
//
//     const reducer = search(initialState, data);
//     t.equal(compose(length, prop('kakapofavs'))(reducer), 14, 'update the store with the new data');
//   });
// });

// test('[reducer/search] teardown', () => {
//   global.fetch.restore();
// });
