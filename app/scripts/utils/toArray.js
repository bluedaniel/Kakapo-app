/**
* # To Array
* An ES6 (indirect) port of underscore toArray <http://underscorejs.org/#toArray>
* Creates an Array from an Object
* @param {Object}
* @return {Array}
*/
export default obj => Object.keys(obj).map(key => obj[key]);
