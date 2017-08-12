import { cond, T, equals, always, map, pathOr, propOr } from 'ramda';
import { put, takeLatest } from 'redux-saga/effects';
import { searchActions, searchTypes } from 'actions/';
import {
  getYoutubeSearch,
  getSoundCloudSearch,
  getKakapoFavourites
} from 'api/';

const formatDuration = timestamp => {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp - hours * 3600) / 60);
  const seconds = timestamp - hours * 3600 - minutes * 60;
  let time = '';

  if (hours !== 0) time += `${hours}:`;
  time += minutes < 10 ? `0${minutes}:` : `${String(minutes)}:`;
  return !time ? seconds : time + (seconds < 10 ? `0${seconds}` : seconds);
};

// Convert YouTube ISO8061 duration string
const parseDuration = duration =>
  duration.match(/[0-9]+[HMS]/g).forEach(part => {
    const unit = part.charAt(part.length - 1);
    const amount = parseInt(part.slice(0, -1), 0);
    switch (unit) {
      case 'H':
        return amount * 60 * 60;
      case 'M':
        return amount * 60;
      case 'S':
        return amount;
      default:
        return 0;
    }
  });

// YouTube Listeners
const mapYoutube = map(_y => ({
  desc: pathOr('', ['snippet', 'description'], _y),
  duration: formatDuration(parseDuration(propOr(0, 'duration', _y))),
  img: pathOr('', ['snippet', 'thumbnails', 'high', 'url'], _y),
  name: pathOr('', ['snippet', 'title'], _y),
  tags: '',
  videoId: pathOr('', ['id', 'videoId'], _y),
  viewCount: parseInt(propOr(0, 'viewCount', _y), 10)
}));

// SoundCloud Listeners
const mapSoundcloud = map(_y => ({
  desc: _y.description,
  duration: formatDuration(_y.duration / 1000),
  img:
    'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
  name: _y.title,
  tags: _y.tag_list,
  scId: parseInt(_y.id, 0),
  userAvatar: _y.user.avatar_url,
  viewCount: _y.playback_count
}));

// KakapoFavourites Listeners
const mapKakapo = map(_y => ({
  ..._y,
  desc: _y.description,
  img: _y.img,
  name: _y.name,
  tags: _y.tags,
  url: _y.url
}));

function* fetchService(service, { term }) {
  const { transform, provider } = cond([
    [
      equals('soundcloud'),
      always({ transform: mapSoundcloud, provider: getSoundCloudSearch })
    ],
    [
      equals('youtube'),
      always({ transform: mapYoutube, provider: getYoutubeSearch })
    ],
    [T, always({ transform: mapKakapo, provider: getKakapoFavourites })]
  ])(service);

  try {
    const resp = yield provider(term);
    yield put(searchActions.requestSuccess(transform(resp), service));
  } catch (err) {
    yield put(searchActions.requestError(err));
  }
}

export default function* rootSaga() {
  yield takeLatest(searchTypes.YOUTUBE, fetchService, 'youtube');
  yield takeLatest(searchTypes.KAKAPO, fetchService, 'kakapofavs');
  yield takeLatest(searchTypes.SOUNDCLOUD, fetchService, 'soundcloud');
}
