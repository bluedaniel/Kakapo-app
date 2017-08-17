import { put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { fetchService } from 'sagas/search';
import { youtubeRes, kakapoRes } from '../helper';

beforeEach(() => {
  fetch.mockResponses(
    [JSON.stringify(youtubeRes.videos), { status: 200 }],
    [JSON.stringify(youtubeRes.statistics), { status: 200 }]
  );
});

test('[sagas/search] search YouTube for `oceans`', async () => {
  expect.assertions(3);

  const data = {};
  data.gen = cloneableGenerator(fetchService)('youtube', { term: 'chess' });
  await expect(data.gen.next().value).resolves.toBe('lemon');

  expect(data.gen.next().value).toBe(put({ type: 'SHIT' }));
});
