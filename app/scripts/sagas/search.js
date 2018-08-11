import {
  always,
  applySpec,
  concat,
  cond,
  divide,
  dropLast,
  equals,
  flip,
  identity,
  last,
  map,
  match,
  multiply,
  pathOr,
  pipe,
  prop,
  propOr,
  subtract,
  sum,
  T,
} from 'ramda';
import { put, takeLatest } from 'redux-saga/effects';
import { searchActions } from 'actions/';
import {
  getYoutubeSearch,
  getSoundCloudSearch,
  getKakapoFavourites,
} from 'api/';

const [concatF, divideF, subtractF] = map(flip, [concat, divide, subtract]);

// Convert timestamp to pretty date
// '7209' //=> "2:00:09"
const formatDuration = t => {
  const hours = pipe(
    divideF(3600),
    Math.floor
  )(t);
  const minutes = pipe(
    subtractF(hours * 3600),
    divideF(60),
    Math.floor
  )(t);
  const concatSeconds = pipe(
    subtractF(hours * 3600),
    subtractF(minutes * 60),
    x => (x < 10 ? concatF(`0${x}`) : concatF(String(x)))
  )(t);

  return pipe(
    hours !== 0 ? concatF(`${hours}:`) : identity,
    minutes < 10 ? concatF(`0${minutes}:`) : concatF(`${minutes}:`),
    x => (!x ? concatSeconds('') : concatSeconds(x))
  )('');
};

// Convert YouTube ISO8061 duration string
// 'PT120M9S' //=> 7209
const parseDuration = pipe(
  match(/[0-9]+[HMS]/g),
  map(
    pipe(
      cond([
        [
          pipe(
            last,
            equals('H')
          ),
          pipe(
            dropLast(1),
            multiply(60 * 60)
          ),
        ],
        [
          pipe(
            last,
            equals('M')
          ),
          pipe(
            dropLast(1),
            multiply(60)
          ),
        ],
        [
          pipe(
            last,
            equals('S')
          ),
          dropLast(1),
        ],
        [T, always(0)],
      ]),
      Number
    )
  ),
  sum
);

// YouTube schema
const specYoutube = applySpec({
  desc: pathOr('', ['snippet', 'description']),
  duration: pipe(
    propOr(0, 'duration'),
    parseDuration,
    formatDuration
  ),
  img: pathOr('', ['snippet', 'thumbnails', 'high', 'url']),
  name: pathOr('', ['snippet', 'title']),
  tags: always(''),
  videoId: pathOr('', ['id', 'videoId']),
  viewCount: pipe(
    propOr(0, 'viewCount'),
    parseInt
  ),
});

// SoundCloud schema
const specSoundcloud = applySpec({
  desc: prop('description'),
  duration: pipe(
    prop('duration'),
    divideF(1000),
    formatDuration
  ),
  img: always(
    'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png'
  ),
  name: prop('title'),
  tags: prop('tag_list'),
  scId: pipe(
    prop('id'),
    parseInt
  ),
  userAvatar: pathOr('', ['user', 'avatar_url']),
  viewCount: prop('playback_count'),
});

// KakapoFavourites schema
const specKakapo = applySpec({
  source: prop('source'),
  name: prop('name'),
  desc: propOr('', 'description'),
  file: prop('file'),
  tags: prop('tags'),
  volume: always(0.5),
  playing: always(false),
  editing: always(false),
  progress: always(1),
  img: prop('img'),
  recentlyDownloaded: always(false),
  url: propOr('', 'url'),
});

export function* fetchService(service, { term }) {
  try {
    const { transform, provider } = cond([
      [
        equals('soundcloud'),
        always({ transform: specSoundcloud, provider: getSoundCloudSearch }),
      ],
      [
        equals('youtube'),
        always({ transform: specYoutube, provider: getYoutubeSearch }),
      ],
      [T, always({ transform: specKakapo, provider: getKakapoFavourites })],
    ])(service);
    const resp = yield provider(term);
    yield put(searchActions.requestSuccess(map(transform, resp), service));
  } catch (err) {
    yield put(searchActions.requestError(err));
  }
}

export default function* rootSaga() {
  yield takeLatest(searchActions.SEARCH_YOUTUBE, fetchService, 'youtube');
  yield takeLatest(searchActions.SEARCH_KAKAPO, fetchService, 'kakapofavs');
  yield takeLatest(searchActions.SEARCH_SOUNDCLOUD, fetchService, 'soundcloud');
}
