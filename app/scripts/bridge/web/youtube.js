/* eslint no-new:0 */
import { newSoundClass } from 'classes/';

export default {
  getYoutubeObj({ file, playing }) {
    return new Promise(resolve => {
      const elID = `video-${file}`;
      const checkExist = setInterval(() => {
        if (document.getElementById(elID)) {
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
              showinfo: 0
            },
            events: {
              onReady: (el) => {
                resolve({
                  play: () => el.target.playVideo(),
                  pause: () => el.target.pauseVideo(),
                  volume: vol => el.target.setVolume(vol * 100),
                  mute: toggle => {
                    if (toggle) return el.target.mute();
                    return el.target.unMute();
                  },

                  unload: () => el.target.destroy()
                });
              }
            }
          });
          clearInterval(checkExist);
        }
      }, 250); // iFrame wont exist until after render
    });
  },

  getYoutubeURL(data) {
    return new Promise(resolve => resolve({ ...newSoundClass, ...data }));
  }
};
