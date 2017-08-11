import { prop, compose, length } from 'ramda';
import { store } from 'stores/configureStore';
import { searchActions } from 'actions/';
import search, { initialState } from 'reducers/search';
import { youtubeRes, kakapoRes } from '../helper';

beforeEach(() => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }],
    [JSON.stringify(kakapoRes), { status: 200 }]
  );
});

test('[reducer/search] search YouTube for `oceans`', () => {
  expect.assertions(3);

  return store.dispatch(searchActions.youtube('oceans')).then(data => {
    expect(data.type).toBe('SEARCH_YOUTUBE');
    expect(data.items.length).toBe(2);

    const reducer = search(initialState, data);
    expect(compose(length, prop('youtube'))(reducer)).toBe(2);
  });
});

test('[reducer/search] search Kakapo', () => {
  expect.assertions(3);
  return store.dispatch(searchActions.kakapo()).then(data => {
    expect(data.type).toBe('SEARCH_KAKAPO');
    expect(data.items.length).toBe(14);

    const reducer = search(initialState, data);
    expect(compose(length, prop('kakapofavs'))(reducer)).toBe(14);
  });
});
