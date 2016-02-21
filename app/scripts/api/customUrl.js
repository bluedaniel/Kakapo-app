import axios from 'axios';

export function getKakapoFavourites() {
  return new Promise((resolve, reject) => {
    axios
    .get('http://data.kakapo.co/v2/data/sounds.json')
    .then(({ data }) => resolve(data))
    .catch(({ data }) => reject(data.errors[0].error_message));
  });
}
