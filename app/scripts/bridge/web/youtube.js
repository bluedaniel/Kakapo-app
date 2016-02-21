import { newSoundClass } from 'classes/';

export default {
  getYoutubeObj({ file, playing }) {
    return new Promise(resolve => {
      const elID = `video-${file}`;
      if (document.getElementById(elID)) {
        setInterval(() => new window.YT.Player(elID, {
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
            onReady: ({ target }) => {
              resolve({
                play: () => target.playVideo(),
                pause: () => target.pauseVideo(),
                volume: vol => target.setVolume(vol * 100),
                mute: toggle => {
                  if (toggle) return target.mute();
                  return target.unMute();
                },
                unload: () => target.destroy()
              });
            }
          }
        }), 100); // iFrame wont exist until after render
      }
    });
  },

  getYoutubeURL(data) {
    return new Promise(resolve => resolve({ ...newSoundClass, ...data }));
  }
};
