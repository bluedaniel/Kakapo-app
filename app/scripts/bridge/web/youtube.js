import { merge } from 'ramda';
import { newSoundObj } from 'utils/';

const newYTPlayer = (elID, file, playing, resolve) =>
  new window.YT.Player(elID, {
    videoId: file,
    height: 225,
    width: 400,
    playerVars: {
      iv_load_policy: 3,
      autoplay: playing ? 1 : 0,
      controls: 0,
      loop: 1,
      playlist: file,
      showinfo: 0,
    },
    events: {
      onReady: ({ target }) => {
        resolve({
          play: () => target.playVideo(),
          pause: () => target.pauseVideo(),
          volume: vol => target.setVolume(vol * 100),
          mute: toggle => (toggle ? target.mute() : target.unMute()),
          unload: () => target.destroy(),
        });
      },
    },
  });

export default {
  getYoutubeObj({ file, playing }) {
    return new Promise(resolve => {
      const elID = `video-${file}`;
      const checkExist = setInterval(() => {
        if (document.getElementById(elID)) {
          newYTPlayer(elID, file, playing, resolve);
          clearInterval(checkExist);
        }
      }, 250); // iFrame wont exist until after render
    });
  },

  getYoutubeURL: merge(newSoundObj),
};
