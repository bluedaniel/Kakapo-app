import { compose, set, pathOr, propOr, lensProp } from 'ramda';
import constants from 'actions/constants/';
import { createReducer } from 'utils/';

const {
  SEARCH_REQUEST,
  SEARCH_KAKAPO,
  SEARCH_YOUTUBE,
  SEARCH_SOUNDCLOUD
} = constants;

export const initialState = {
  youtube: [],
  soundcloud: [],
  kakapofavs: [],
  loading: false
};

const searchReducers = {
  formatDuration(timestamp) {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp - hours * 3600) / 60);
    const seconds = timestamp - hours * 3600 - minutes * 60;
    let time = '';

    if (hours !== 0) time += `${hours}:`;
    time += minutes < 10 ? `0${minutes}:` : `${String(minutes)}:`;
    return !time ? seconds : time + (seconds < 10 ? `0${seconds}` : seconds);
  },

  // Convert YouTube ISO8061 duration string
  parseDuration(duration) {
    let seconds = 0;
    duration.match(/[0-9]+[HMS]/g).forEach(part => {
      const unit = part.charAt(part.length - 1);
      const amount = parseInt(part.slice(0, -1), 0);
      switch (unit) {
        case 'H':
          seconds += amount * 60 * 60;
          break;
        case 'M':
          seconds += amount * 60;
          break;
        case 'S':
          seconds += amount;
          break;
        default:
          seconds += 0;
      }
    });
    return seconds;
  },

  // YouTube Listeners
  mapYoutube(results) {
    return results.map(_y => ({
      desc: pathOr('', ['snippet', 'description'], _y),
      duration: this.formatDuration(
        this.parseDuration(propOr(0, 'duration', _y))
      ),
      img: pathOr('', ['snippet', 'thumbnails', 'high', 'url'], _y),
      name: pathOr('', ['snippet', 'title'], _y),
      tags: '',
      videoId: pathOr('', ['id', 'videoId'], _y),
      viewCount: parseInt(propOr(0, 'viewCount', _y), 10)
    }));
  },

  // SoundCloud Listeners
  mapSoundcloud(results) {
    return results.map(_y => ({
      desc: _y.description,
      duration: this.formatDuration(_y.duration / 1000),
      img:
        'https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png',
      name: _y.title,
      tags: _y.tag_list,
      scId: parseInt(_y.id, 0),
      userAvatar: _y.user.avatar_url,
      viewCount: _y.playback_count
    }));
  },

  // KakapoFavourites Listeners
  mapKakapo(results) {
    return results.map(_y => ({
      ..._y,
      desc: _y.description,
      img: _y.img,
      name: _y.name,
      tags: _y.tags,
      url: _y.url
    }));
  },

  fetchComplete(state, service, list) {
    return compose(
      set(lensProp('loading'), false),
      set(lensProp(service), list)
    )(state);
  }
};

export default createReducer(initialState, {
  [SEARCH_REQUEST]: set(lensProp('loading'), true),
  [SEARCH_YOUTUBE]: (state, { items }) =>
    searchReducers.fetchComplete(
      state,
      'youtube',
      searchReducers.mapYoutube(items)
    ),
  [SEARCH_SOUNDCLOUD]: (state, { items }) =>
    searchReducers.fetchComplete(
      state,
      'soundcloud',
      searchReducers.mapSoundcloud(items)
    ),
  [SEARCH_KAKAPO]: (state, { items }) =>
    searchReducers.fetchComplete(
      state,
      'kakapofavs',
      searchReducers.mapKakapo(items)
    )
});
