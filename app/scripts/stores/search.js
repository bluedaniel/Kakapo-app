import Reflux from "reflux";
import moment from "moment";
import numeral from "numeral";
import trimLeft from "lodash/string/trimLeft";
import { searchActions } from "../actions";
import { toasterInstance } from "../utils";

function formatDuration(seconds) {
  let formatted = trimLeft(numeral(seconds).format("00:00:00"), "0:");
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
    this.results.youtube = results.map(y => {
      return {
        desc: y.snippet.description,
        duration: formatDuration(moment.duration(y.duration).asSeconds()),
        img: y.snippet.thumbnails.high.url,
        name: y.snippet.title,
        tags: "",
        videoId: y.id.videoId,
        viewCount: parseInt(y.viewCount)
      };
    });
    this.trigger(this.results);
  },
  onGetYoutubeSearchFailed(error) {
    toasterInstance().then(t => t.toast(error));
  },

  // SoundCloud Listeners
  onGetSoundCloudSearchCompleted(results) {
    this.results.soundcloud = results.map(y => {
      return {
        desc: y.description,
        duration: formatDuration(numeral(y.duration / 1000)),
        img: "https://w.soundcloud.com/icon/assets/images/orange_white_128-e278832.png",
        name: y.title,
        tags: y.tag_list,
        scId: parseInt(y.id),
        userAvatar: y.user.avatar_url,
        viewCount: y.playback_count
      };
    });
    this.trigger(this.results);
  },
  onGetSoundCloudSearchFailed(error) {
    toasterInstance().then(t => t.toast(error));
  },

  // KakapoFavourites Listeners
  onGetKakapoFavouritesCompleted(results) {
    this.results.kakapofavs = results.map(y => {
      return {...y, ...{
        desc: y.description,
        img: y.img,
        name: y.name,
        tags: y.tags,
        url: y.url
      }};
    });
    this.trigger(this.results);
  },
  onGetKakapoFavouritesFailed(error) {
    toasterInstance().then(t => t.toast(error));
  }
});
