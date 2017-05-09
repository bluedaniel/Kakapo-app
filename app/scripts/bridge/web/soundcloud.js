import { newSoundClass } from 'classes/';
import { serialize } from 'utils/';

const SCAPI = 'http://api.soundcloud.com';
const SCAPI_TRACKS = `${SCAPI}/tracks`;
const SOUNDCLOUD_KEY = '733c506264b8a0b6b05c85d9f1615567';

export default {
  getSoundCloudObj({ file, volume, playing }) {
    const soundCloudObj = new Audio();
    soundCloudObj.src = `${file}?client_id=${SOUNDCLOUD_KEY}`;
    soundCloudObj.loop = true;
    soundCloudObj.volume = volume;
    soundCloudObj.autoplay = playing;
    return {
      play: () => soundCloudObj.play(),
      pause: () => soundCloudObj.pause(),
      volume: vol => {
        soundCloudObj.volume = vol;
      },
      mute: toggle => {
        soundCloudObj.muted = toggle;
      },
      unload: () => {
        soundCloudObj.pause();
        soundCloudObj.src = '';
      }
    };
  },

  getSoundCloudSearch(q) {
    if (!window.SC) window.SC.initialize({ client_id: SOUNDCLOUD_KEY });
    return new Promise(resolve =>
      window.SC.get('/tracks', { q }, tracks => resolve(tracks))
    );
  },

  getSoundCloudURL(subject, id) {
    const url = `${SCAPI_TRACKS}/${id}${serialize({
      client_id: SOUNDCLOUD_KEY
    })}`;
    fetch(url)
      .then(response => response.json())
      .then(({ data }) => {
        subject.next({
          ...newSoundClass,
          file: data.stream_url,
          img: data.artwork_url,
          link: data.permalink_url,
          name: data.title,
          progress: 0,
          source: 'soundcloudStream',
          tags: data.tag_list
        });
      })
      .catch(({ data }) => subject.error(data.errors[0].error_message));
  }
};
