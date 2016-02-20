import axios from 'axios';

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
  axios.get(`${GAPI_URL}/videos`, { params })
    .then(response => resolve(response.data.items.map(_v =>
      ({ ...videos[_it++], ...{
        duration: _v.contentDetails.duration,
        viewCount: _v.statistics.viewCount } }))))
    .catch(response => reject(response));
}

export function getYoutubeSearch(q) {
  return new Promise((resolve, reject) => {
    const params = { ...GAPI_OPTS_SEARCH, q };
    axios.get(`${GAPI_URL}/search`, { params })
      .then(response => getStatistics(resolve, reject, response.data.items))
      .catch(response => reject(response));
  });
}
