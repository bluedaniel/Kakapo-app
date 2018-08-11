import { addIndex, map, pipe, prop } from 'ramda';
import { serialize } from 'utils/';

const mapIndexed = addIndex(map);

const GAPI_URL = 'https://www.googleapis.com/youtube/v3';
const GAPI_KEY = 'AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI';
const GAPI_OPTS_SEARCH = {
  key: GAPI_KEY,
  maxResults: 15,
  part: 'snippet',
  type: 'video',
};
const GAPI_OPTS_LIST = {
  key: GAPI_KEY,
  part: 'contentDetails,statistics,status',
};

export const getStatistics = (resolve, reject, videos) => {
  const params = {
    ...GAPI_OPTS_LIST,
    ...{ id: videos.map(_i => _i.id.videoId).join(',') },
  };

  fetch(`${GAPI_URL}/videos${serialize(params)}`)
    .then(resp => resp.json())
    .then(
      pipe(
        prop('items'),
        mapIndexed((_v, i) => ({
          ...videos[i],
          duration: _v.contentDetails.duration,
          viewCount: _v.statistics.viewCount,
        })),
        resolve
      )
    )
    .catch(reject);
};

export const getYoutubeSearch = q =>
  new Promise((resolve, reject) =>
    fetch(`${GAPI_URL}/search${serialize({ ...GAPI_OPTS_SEARCH, q })}`)
      .then(resp => resp.json())
      .then(({ items }) => getStatistics(resolve, reject, items))
      .catch(reject)
  );
