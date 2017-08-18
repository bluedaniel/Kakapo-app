import { put } from 'redux-saga/effects';
import { map } from 'ramda';
import { fetchService } from 'sagas/search';
import { searchActions } from 'actions/';
import { youtubeRes, kakapoRes } from '../helper';

test('[sagas/search] success search YouTube for `chess`', async () => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }]
  );

  const gen = fetchService('youtube', { term: 'chess' });

  await expect(gen.next().value).resolves.toEqual(youtubeRes.combined);

  const items = [
    {
      desc: 'Test',
      duration: 'NaN:NaN:NaN',
      img: 'http://test.com',
      name: 'Test',
      tags: '',
      videoId: 'YTg7fpGLsKE',
      viewCount: 10000
    },
    {
      desc: 'Test2',
      duration: 'NaN:NaN:NaN',
      img: 'http://test2.com',
      name: 'Test2',
      tags: '',
      videoId: 'vWyDDn2-5Gk',
      viewCount: 1000
    }
  ];

  expect(gen.next(youtubeRes.combined).value).toEqual(
    put(searchActions.requestSuccess(items, 'youtube'))
  );
});

test('[sagas/search] failed search YouTube for `chess`', async () => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }]
  );

  const gen = fetchService('youtube', { term: 'chess' });

  await expect(gen.next().value).resolves.toEqual(youtubeRes.combined);
  expect(gen.throw('test').value).toEqual(
    put(searchActions.requestError('test'))
  );
});

test('[sagas/search] success search Kakapo', async () => {
  fetch.mockResponses([JSON.stringify(kakapoRes), { status: 200 }]);

  const gen = fetchService('kakapofavs', { term: '' });

  await expect(gen.next().value).resolves.toEqual(kakapoRes);

  const items = map(x => ({ ...x, desc: '', url: '' }), kakapoRes);

  expect(gen.next(kakapoRes).value).toEqual(
    put(searchActions.requestSuccess(items, 'kakapofavs'))
  );
});
