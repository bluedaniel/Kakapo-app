import Reflux from "reflux";
import moment from "moment";
import numeral from "numeral";
import trimLeft from "lodash/string/trimLeft";
import { searchActions } from "../actions";
import { toasterInstance } from "../utils";

function formatDuration(seconds) {
  const formatted = trimLeft(numeral(seconds).format("00:00:00"), "0:");
  return formatted.indexOf(":") === -1 ? `0:${formatted}` : formatted;
}

export default Reflux.createStore({
  listenables: [searchActions],
  init() {
    this.results = {
      youtube: [],
      soundcloud: [],
      kakapofavs: []
    };
  },

  getInitialState() {
    return this.results;
  },

  // YouTube Listeners
  onGetYoutubeSearchCompleted(results) {
    this.results.youtube = results.map(_y => {
      return {
        desc: _y.snippet.description,
        duration: formatDuration(moment.duration(_y.duration).asSeconds()),
        img: _y.snippet.thumbnails.high.url,
        name: _y.snippet.title,
        tags: "",
        videoId: _y.id.videoId,
        viewCount: parseInt(_y.viewCount, 0)
      };
    });
    this.trigger(this.results);
  },

  onGetYoutubeSearchFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // SoundCloud Listeners
  onGetSoundCloudSearchCompleted(results) {
    this.results.soundcloud = results.map(_y => {
      return {
        desc: _y.description,
        duration: formatDuration(numeral(_y.duration / 1000)),
        img: "https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png",
        name: _y.title,
        tags: _y.tag_list,
        scId: parseInt(_y.id, 0),
        userAvatar: _y.user.avatar_url,
        viewCount: _y.playback_count
      };
    });
    this.trigger(this.results);
  },

  onGetSoundCloudSearchFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // KakapoFavourites Listeners
  onGetKakapoFavouritesCompleted(results) {
    this.results.kakapofavs = results.map(_y => {
      return {..._y, ...{
        desc: _y.description,
        img: _y.img,
        name: _y.name,
        tags: _y.tags,
        url: _y.url
      }};
    });
    this.trigger(this.results);
  },

  onGetKakapoFavouritesFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  }
});
