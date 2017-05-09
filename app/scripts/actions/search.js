import constants from 'constants/';
import {
  getYoutubeSearch,
  getSoundCloudSearch,
  getKakapoFavourites
} from 'api/';

const {
  SEARCH_REQUEST,
  SEARCH_INPUT,
  SEARCH_KAKAPO,
  SEARCH_YOUTUBE,
  SEARCH_SOUNDCLOUD,
  SEARCH_ERROR
} = constants;

const actions = {
  searchInput: input => ({ type: SEARCH_INPUT, input }),
  searchKakapo: () => dispatch => dispatch(actions.fetchService('kakapo')),
  searchYoutube: term => dispatch =>
    dispatch(actions.fetchService('youtube', term)),
  searchSoundCloud: term => dispatch =>
    dispatch(actions.fetchService('soundcloud', term)),

  fetchService: (service, term) => dispatch =>
    new Promise((resolve, reject) => {
      dispatch(actions.fetchServiceRequest());
      let opts = { provider: getKakapoFavourites, type: SEARCH_KAKAPO }; // Kakapo default
      if (service === 'youtube') {
        opts = { provider: getYoutubeSearch, type: SEARCH_YOUTUBE };
      }
      if (service === 'soundcloud') {
        opts = { provider: getSoundCloudSearch, type: SEARCH_SOUNDCLOUD };
      }
      opts
        .provider(term)
        .catch(err => reject(dispatch(actions.fetchServiceError(err))))
        .then(resp =>
          resolve(dispatch(actions.fetchServiceComplete(resp, opts.type)))
        );
    }),

  fetchServiceRequest: () => ({ type: SEARCH_REQUEST }),
  fetchServiceComplete: (items, type) => ({ type, items }),
  fetchServiceError: err => ({ type: SEARCH_ERROR, err })
};

export default actions;
