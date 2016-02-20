import constants from 'constants/';
import { getYoutubeSearch, getSoundCloudSearch, getKakapoFavourites } from 'api/';

const actions = {
  searchInput: input => ({ type: constants.SEARCH_INPUT, input }),
  searchKakapo: () => dispatch => dispatch(actions.fetchService('kakapo')),
  searchYoutube: term => dispatch => dispatch(actions.fetchService('youtube', term)),
  searchSoundCloud: term => dispatch => dispatch(actions.fetchService('soundcloud', term)),

  fetchService: (service, term) => dispatch => new Promise((resolve, reject) => {
    let opts = { provider: getKakapoFavourites, type: constants.SEARCH_KAKAPO }; // Kakapo default
    if (service === 'youtube') {
      opts = { provider: getYoutubeSearch, type: constants.SEARCH_YOUTUBE };
    }
    if (service === 'soundcloud') {
      opts = { provider: getSoundCloudSearch, type: constants.SEARCH_SOUNDCLOUD };
    }
    opts
      .provider(term)
      .catch(err => reject(dispatch(actions.fetchServiceError(err))))
      .then(resp => resolve(dispatch(actions.fetchServiceComplete(resp, opts.type))));
  }),

  fetchServiceComplete: (items, type) => ({ type, items }),
  fetchServiceError: err => ({ type: constants.SEARCH_ERROR, err })
};

export default actions;
