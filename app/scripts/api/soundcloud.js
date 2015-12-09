import axios from 'axios';
import { newSoundClass } from '../classes';

const SCAPI = 'http://api.soundcloud.com';
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = '733c506264b8a0b6b05c85d9f1615567';

export function getSoundCloudObj(sound) {
  const soundCloudObj = new Audio();
  soundCloudObj.src = `${sound.file}?client_id=${SOUNDCLOUD_KEY}`;
  soundCloudObj.loop = true;
  soundCloudObj.volume = sound.volume;
  soundCloudObj.autoplay = sound.playing;
  return {
    play: () => soundCloudObj.play(),
    pause: () => soundCloudObj.pause(),
    volume: vol => soundCloudObj.volume = vol,
    mute: toggle => soundCloudObj.muted = toggle,
    unload: () => {
      soundCloudObj.pause();
      soundCloudObj.src = '';
    }
  };
}

export function getSoundCloudSearch(term) {
  if (!window.SC) window.SC.initialize({ client_id: SOUNDCLOUD_KEY });
  return new Promise(resolve =>
    window.SC.get('/tracks', { q: term }, tracks => resolve(tracks)));
}

export function getSoundCloudURL(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${SCAPI_TRACKS}/${id}`, { params: { client_id: SOUNDCLOUD_KEY } })
      .then(response => resolve({ ...newSoundClass, ...{
        file: response.data.stream_url,
        img: response.data.artwork_url,
        link: response.data.permalink_url,
        name: response.data.title,
        progress: 0,
        source: 'soundcloudStream',
        tags: response.data.tag_list
      } }))
      .catch(response => reject(response.data.errors[0].error_message));
  });
}
