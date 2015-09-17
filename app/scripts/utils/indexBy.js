/**
* # Index By
* An ES6 (indirect) port of underscore indexBy <http://underscorejs.org/#indexBy>
* Given an Array, and a key. Returns a map, indexed by the value of the item's key.
* @param {Array} array
* @param {String} key
* @return {Object}
*/
export default (array, key) => array.reduce((acc, item) => (acc[item[key]] = item) && acc, {});
