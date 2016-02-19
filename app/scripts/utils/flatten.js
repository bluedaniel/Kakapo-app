
// [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]
export const flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

// { 'a':{ 'b':{ 'b2':2 }, 'c':{ 'c2':2 } } } → { 'a.b.b2':2, 'a.c.c2':2 }
export const flatteni18n = obj => Object.keys(obj).reduce((_r, _k) => {
  if (typeof obj[_k] === 'object') {
    const flatObj = flatteni18n(obj[_k]);
    Object.keys(flatObj).map(_f => _r[_f ? `${_k}.${_f}` : _k] = flatObj[_f]);
  } else {
    _r[_k] = obj[_k];
  }
  return _r;
}, {});
