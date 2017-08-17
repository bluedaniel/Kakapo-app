import { put } from 'redux-saga/effects';
import { fetchService } from 'sagas/search';
import { searchActions } from 'actions/';
import { youtubeRes, kakapoRes } from '../helper';

beforeEach(() => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }]
  );
});

test('[sagas/search] success search YouTube for `chess`', async () => {
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
  const gen = fetchService('youtube', { term: 'chess' });

  await expect(gen.next().value).resolves.toEqual(youtubeRes.combined);
  expect(gen.throw('test').value).toEqual(
    put(searchActions.requestError('test'))
  );
});
