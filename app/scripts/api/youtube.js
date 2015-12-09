import axios from 'axios';
import { newSoundClass } from '../classes';

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

function getStatistics(resolve, reject, videos) {
  // Get the duration
  let _it = 0;
  const paramObjV = { ...GAPI_OPTS_LIST, ...{ id: videos.map(_i => _i.id.videoId).join(',') } };
  axios.get(`${GAPI_URL}/videos`, { params: paramObjV })
    .then(response => resolve(response.data.items.map(_v =>
      ({ ...videos[_it++], ...{
        duration: _v.contentDetails.duration,
        viewCount: _v.statistics.viewCount } }))))
    .catch(response => reject(response));
}

export function getYoutubeObj(video) {
  return new Promise(resolve => new window.YT.Player(`video-${video.file}`, {
    videoId: video.file,
    height: 225,
    width: 400,
    playerVars: {
      iv_load_policy: 3,
      autoplay: video.playing ? 1 : 0,
      controls: 0,
      loop: 1,
      playlist: video.file,
      showinfo: 0
    },
    events: {
      onReady: (el) => resolve({
        play: () => el.target.playVideo(),
        pause: () => el.target.pauseVideo(),
        volume: vol => el.target.setVolume(vol * 100),
        mute: toggle => {
          if (toggle) return el.target.mute();
          el.target.unMute();
        },

        unload: () => el.target.destroy()
      })
    }
  }));
}

export function getYoutubeSearch(term) {
  return new Promise((resolve, reject) => {
    const paramObj = { ...GAPI_OPTS_SEARCH, ...{ q: term } };
    axios.get(`${GAPI_URL}/search`, { params: paramObj })
      .then(response => getStatistics(resolve, reject, response.data.items))
      .catch(response => reject(response));
  });
}

export function getYoutubeURL(data) {
  return new Promise(resolve => resolve({ ...newSoundClass, ...{
    file: data.id,
    img: data.thumbnail,
    link: `https://www.youtube.com/watch?v=${data.id}`,
    name: data.title,
    progress: 0,
    source: 'youtubeStream',
    tags: data.tags
  } }));
}
