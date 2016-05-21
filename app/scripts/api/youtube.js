import { serialize } from 'utils/';

const GAPI_URL = 'https://www.googleapis.com/youtube/v3';
const GAPI_KEY = 'AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI';
const GAPI_OPTS_SEARCH = {
  key: GAPI_KEY,
  maxResults: 15,
  part: 'snippet',
  type: 'video'
};
const GAPI_OPTS_LIST = {
  key: GAPI_KEY,
  part: 'contentDetails,statistics,status'
};

export function getStatistics(resolve, reject, videos) {
  let _it = 0;
  const params = { ...GAPI_OPTS_LIST, ...{ id: videos.map(_i => _i.id.videoId).join(',') } };

  fetch(`${GAPI_URL}/videos${serialize(params)}`)
  .then(resp => resp.json())
  .then(({ items }) => resolve(items.map(_v =>
    ({ ...videos[_it++], ...{
      duration: _v.contentDetails.duration,
      viewCount: _v.statistics.viewCount } }))))
  .catch(response => reject(response));
}

export function getYoutubeSearch(q) {
  const params = { ...GAPI_OPTS_SEARCH, q };
  return new Promise((resolve, reject) =>
    fetch(`${GAPI_URL}/search${serialize(params)}`)
    .then(resp => resp.json())
    .then(({ items }) => getStatistics(resolve, reject, items))
    .catch(err => reject(err)));
}
