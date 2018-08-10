import {
  always,
  applySpec,
  compose,
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
  const hours = compose(Math.floor, divideF(3600))(t);
  const minutes = compose(Math.floor, divideF(60), subtractF(hours * 3600))(t);
  const concatSeconds = compose(
    x => (x < 10 ? concatF(`0${x}`) : concatF(String(x))),
    subtractF(minutes * 60),
    subtractF(hours * 3600)
  )(t);

  return compose(
    x => (!x ? concatSeconds('') : concatSeconds(x)),
    minutes < 10 ? concatF(`0${minutes}:`) : concatF(`${minutes}:`),
    hours !== 0 ? concatF(`${hours}:`) : identity
  )('');
};

// Convert YouTube ISO8061 duration string
// 'PT120M9S' //=> 7209
const parseDuration = compose(
  sum,
  map(
    compose(
      Number,
      cond([
        [compose(equals('H'), last), compose(multiply(60 * 60), dropLast(1))],
        [compose(equals('M'), last), compose(multiply(60), dropLast(1))],
        [compose(equals('S'), last), dropLast(1)],
        [T, always(0)],
      ])
    )
  ),
  match(/[0-9]+[HMS]/g)
);

// YouTube schema
const specYoutube = applySpec({
  desc: pathOr('', ['snippet', 'description']),
  duration: compose(formatDuration, parseDuration, propOr(0, 'duration')),
  img: pathOr('', ['snippet', 'thumbnails', 'high', 'url']),
  name: pathOr('', ['snippet', 'title']),
  tags: always(''),
  videoId: pathOr('', ['id', 'videoId']),
  viewCount: compose(parseInt, propOr(0, 'viewCount')),
});

// SoundCloud schema
const specSoundcloud = applySpec({
  desc: prop('description'),
  duration: compose(formatDuration, divideF(1000), prop('duration')),
  img: always(
    'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png'
  ),
  name: prop('title'),
  tags: prop('tag_list'),
  scId: compose(parseInt, prop('id')),
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
