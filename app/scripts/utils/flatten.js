// https://github.com/hughsk/flat
export default function flatten(target, opts) {
  opts = opts || {};

  const delimiter = opts.delimiter || '.';
  let maxDepth = opts.maxDepth;
  let currentDepth = 1;
  let output = {};

  function step(object, prev) {
    Object.keys(object).forEach(function (key) {
      const value = object[key];
      const isarray = opts.safe && Array.isArray(value);
      const type = Object.prototype.toString.call(value);
      const isbuffer = isBuffer(value);
      const isobject = (type === '[object Object]' || type === '[object Array]');

      const newKey = prev ? prev + delimiter + key : key;

      if (!opts.maxDepth) maxDepth = currentDepth + 1;

      if (!isarray && !isbuffer && isobject && Object.keys(value).length && currentDepth < maxDepth) {
        ++currentDepth;
        return step(value, newKey);
      }

      output[newKey] = value;
    });
  }

  step(target);

  return output;
}

function isBuffer(value) {
  if (typeof Buffer === 'undefined') return false;
  return Buffer.isBuffer(value);
}
