import axios from "axios";
import Sound from "../classes/newSound";

const GAPI_URL = "https://www.googleapis.com/youtube/v3";
const GAPI_KEY = "AIzaSyArV70XKUil3cEj4nKn1yuMXCHiuK2AytI";
const GAPI_OPTS_SEARCH = {
  key: GAPI_KEY,
  maxResults: 15,
  part: "snippet",
  type: "video"
};
const GAPI_OPTS_LIST = {
  key: GAPI_KEY,
  part: "contentDetails,statistics,status"
};

function getStatistics(resolve, reject, videos) {
  // Get the duration
  let paramObjV = {...GAPI_OPTS_LIST, ...{id: videos.map(i => i.id.videoId).join(",")}};
  axios.get(`${GAPI_URL}/videos`, { params: paramObjV })
    .then((response, i = 0) => resolve(response.data.items.map(v =>
      ({...videos[i++], ...{
        duration: v.contentDetails.duration,
        viewCount: v.statistics.viewCount}}))))
    .catch(response => reject(response));
}

export function getYoutubeObj(video) {
  return new Promise(resolve => new window.YT.Player(`video-${video.file}`, {
    videoId: video.file,
    height: 225,
    width: 400,
    playerVars: {
      "iv_load_policy": 3,
      autoplay: video.playing ? 1 : 0,
      controls: 0,
      loop: 1,
      playlist: video.file,
      showinfo: 0
    },
    events: {
      onReady: (e) => resolve({
        play: () => e.target.playVideo(),
        pause: () => e.target.pauseVideo(),
        volume: vol => e.target.setVolume(vol * 100),
        mute: toggle => {
          if (toggle) return e.target.mute();
          e.target.unMute();
        },
        unload: () => e.target.destroy()
      })
    }
  }));
}

export function getYoutubeSearch(q) {
  return new Promise((resolve, reject) => {
    let paramObj = {...GAPI_OPTS_SEARCH, ...{q: q}};
    axios.get(`${GAPI_URL}/search`, { params: paramObj })
      .then(response => getStatistics(resolve, reject, response.data.items))
      .catch(response => reject(response));
  });
}

export function getYoutubeURL(id, title, thumbnail, tags) {
  return new Promise(resolve => resolve({...Sound, ...{
    file: id,
    img: thumbnail,
    link: `https://www.youtube.com/watch?v=${id}`,
    name: title,
    progress: 0,
    source: "youtubeStream",
    tags: tags
  }}));
}
