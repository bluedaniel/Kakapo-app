
export function getKakapoFavourites() {
  return window
  .fetch('http://data.kakapo.co/v2/data/sounds.json')
  .then(resp => resp.json())
  .catch(err => err);
}
