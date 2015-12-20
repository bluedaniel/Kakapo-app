import { newSoundClass } from '../../classes';

export default {
  getYoutubeObj(video) {
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
  },

  getYoutubeURL(data) {
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
};
