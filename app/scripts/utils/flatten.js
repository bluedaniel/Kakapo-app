import { reduce } from 'lodash';

export const flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

export const flatteni18n = (obj) => reduce(obj, (_r, _v, _k) => {
  if (typeof _v === 'object') {
    const flatObject = flatteni18n(_v);
    Object.keys(flatObject).map(_f => {
      _r[_k + (!!isNaN(_f) ? '.' + (_f) : '')] = flatObject[_f];
    });
  } else {
    _r[_k] = obj[_k];
  }
  return _r;
}, {});
