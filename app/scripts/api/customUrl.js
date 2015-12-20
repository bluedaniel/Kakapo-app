import axios from 'axios';

export function getKakapoFavourites() {
  return new Promise((resolve, reject) => {
    axios.get('http://data.kakapo.co/v2/data/sounds.json')
      .then(res => resolve(res.data))
      .catch(res => reject(res.data.errors[0].error_message));
  });
}
