import { put } from 'redux-saga/effects';
import { map, merge, __ } from 'ramda';
import { fetchService } from 'sagas/search';
import { searchActions } from 'actions/';
import { youtubeRes, kakapoRes, soundcloudRes } from '../helper';

test('[sagas/search] success search YouTube', async () => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }]
  );

  const gen = fetchService('youtube', { term: 'chess' });

  await expect(gen.next().value).resolves.toEqual(youtubeRes.combined);

  const items = [
    {
      desc: 'Test',
      duration: '03:28',
      img: 'http://test.com',
      name: 'Test',
      tags: '',
      videoId: 'YTg7fpGLsKE',
      viewCount: 10000,
    },
    {
      desc: 'Test2',
      duration: '03:28',
      img: 'http://test2.com',
      name: 'Test2',
      tags: '',
      videoId: 'vWyDDn2-5Gk',
      viewCount: 1000,
    },
  ];

  expect(gen.next(youtubeRes.combined).value).toEqual(
    put(searchActions.requestSuccess(items, 'youtube'))
  );
});

test('[sagas/search] failed search YouTube', async () => {
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

  const items = map(merge(__, { desc: '', url: '' }), kakapoRes);

  expect(gen.next(kakapoRes).value).toEqual(
    put(searchActions.requestSuccess(items, 'kakapofavs'))
  );
});

test('[sagas/search] success search soundcloud', async () => {
  fetch.mockResponses([JSON.stringify(soundcloudRes), { status: 200 }]);

  const gen = fetchService('soundcloud', { term: '' });

  await expect(gen.next().value).resolves.toEqual(soundcloudRes);

  const items = [
    {
      desc: null,
      duration: '00:18.109',
      img:
        'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
      name: 'Munching at Tiannas house',
      scId: 13158665,
      tags: 'soundcloud:source=iphone-record',
      userAvatar:
        'http://a1.sndcdn.com/images/default_avatar_large.png?142a848',
      viewCount: 0,
    },
  ];

  expect(gen.next(soundcloudRes).value).toEqual(
    put(searchActions.requestSuccess(items, 'soundcloud'))
  );
});
