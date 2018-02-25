import { merge } from 'ramda';
import { serialize, newSoundObj } from 'utils/';

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
      },
    };
  },

  getSoundCloudSearch(q) {
    window.SC.initialize({ client_id: SOUNDCLOUD_KEY });
    return new Promise(resolve =>
      window.SC.get('/tracks', { q }, tracks => resolve(tracks))
    );
  },

  getSoundCloudURL(id) {
    const url = `${SCAPI_TRACKS}/${id}${serialize({
      client_id: SOUNDCLOUD_KEY,
    })}`;
    return fetch(url)
      .then(resp => resp.json())
      .then(
        ({
          stream_url: file,
          artwork_url: img,
          permalink_url: link,
          title,
          tag_list: tags,
        }) =>
          merge(newSoundObj, {
            file,
            img,
            link,
            name: title,
            progress: 0,
            source: 'soundcloudStream',
            tags,
          })
      )
      .catch(({ message }) => message);
  },
};
